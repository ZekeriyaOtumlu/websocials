$(document).ready(function () {
    $.ajax("/burgers", {
        type: "GET"
    }).then(function (data) {
        console.log(data);

        var allburgers = $("#allBurgers");
        var devouredBurger = $("#trashBurger");

        var burgers = data.burgers;
        var len = burgers.length;

        for (var i = 0; i < len; i++) {
            var devourButton = "<li><div class='burgersDiv'>" + burgers[i].id + "." + burgers[i].burger_name +
                "<button data-burgerid='" + burgers[i].id + "'class='eatburger btn btn-warning'" + "' data-devour='" + !burgers[i].devoured + "'>Devour!";

            if (!burgers[i].devoured) {
                allburgers.append(devourButton);
            }
            devourButton += "</button></div></li>";

            var deleteButton = "<li><div class='burgersDiv'>" + burgers[i].burger_name + "<button class ='trashburger btn btn-danger' data-id='" + burgers[i].id + "'>Delete";

            if (burgers[i].devoured) {
                devouredBurger.append(deleteButton);
            }
            deleteButton += "</button></div></li>";
        }
    });

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newburger").val().trim(),
            devoured: false
        };

        console.log("added new burger")
        //  Send POST request
        $.ajax("/burgers", {
            type: "POST",
            data: JSON.stringify(newBurger),
            dataType: "json",
            contentType: "application/json"

        }).then(function () {
            console.log("Your Order Have been added");
            // Reload the page to get updated burger list
            location.reload();
        });

    });


    $(document).on("click", ".eatburger", function (event) {
        event.preventDefault();

        var id = $(this).attr("data-burgerid");
        var devouredBurger = $(this).data("devour") === true;

        var devouredState = {
            devoured: devouredBurger
        };

        // Send PUT request
        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(devouredState),
            dataType: "json",
            contentType: "application/json"
        }).then(function () {
            console.log("Your Burger Done!!!");
            location.reload();

        });
    });

    $(document).on("click", ".trashburger", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        console.log(id);

        // Send the DELETE request.
        $.ajax("/burgers/" + id, {
            type: "DELETE"
          
        }).then(function () {
            location.reload();
            console.log("Deleted burger", id)
        });
    });
});