// Dependencies
// ===============================================================================
const path = require("path");
var friends = require("../data/friends.js");

// Routes
// ===============================================================================

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var newPerson = {
            name: req.body.name,
            photo: req.body.photo,
            scores: JSON.parse(req.body.scores)
        }

        var diffArray = [];

        friends.forEach(function(item, index) {
            var difference = 0;
            for (var i = 0; i < item.scores.length; i++) {
                difference += Math.abs(item.scores[i] - newPerson.scores[i]);
            }
            diffArray.push({ "difference": difference, "index": index });
        });

        diffArray.sort(function(a, b) {
            return a.difference - b.difference;
        });

        friends.push(newPerson);
        res.json(friends[diffArray[0].index]);

    });

}