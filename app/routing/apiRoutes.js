
var friends = require("../data/friends.js");
var path = require("path");


module.exports = function(app){
    app.get("/api/friends", function(req,res){
        res.json(friends);
        console.log(friends);
    });

    app.post("/api/friends", function(req,res){

        var newUser = {
            name: req.body.name,
            photo: req.body.photo,
            scores: JSON.parse(req.body.scores)
        }

        var diffArray =[];

        friends.forEach(function(item,index){
            var difference = 0;
            for(var i=0; item.scores.length; i++){
                difference += Math.abs(item.scores[i] - newUser.scores[i]);
            }
            diffArray.push({"difference": difference, "index":index});
        });
        diffArray.sort(function(a,b){
            return a.difference - b.difference;
        });

        friends.push(newUser);
        res.json(friends[diffArray[0].index])
    });
};