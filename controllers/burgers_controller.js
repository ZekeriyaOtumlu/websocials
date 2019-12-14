var express = require("express");

var router = express.Router();
// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger");

router.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create all our routes and set up logic within those routes where required.

router.get("/burgers", function(req, res){
    burger.selectAll(function(data){
        res.json({burgers: data});
    });
});

// STEP 2
// - receive data in controller
// - relay data to "modal" file which sorts data by table name
router.post("/burgers", function(req, res){
    burger.insertOne([
        "burger_name", "devoured"
      ], [
        req.body.burger_name, req.body.devoured
      ], function(result) {
        // STEP 7: receive data as parameter
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
      });
    });

    router.put("/burgers/:id", function(req, res) {
        var condition = "id = " + req.params.id;
      
        console.log("condition", condition);
      
        burger.updateOne({
          devoured: req.body.devoured
        }, condition, function(result) {
          if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.json({ id: req.params.id});
          }
        });
      });

      router.delete("/burgers/:id", function(req, res) {
        var condition = "id = " + req.params.id;
      
        burger.deleteOne(condition, function(result) {
          if (result.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }
        });
      });
      
      // Export routes for server.js to use.
      module.exports = router;
      