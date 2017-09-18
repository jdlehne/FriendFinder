var friendData = require("../data/friends.js");
//var fs = require("fs");
//var Friends = [];

module.exports = function(app) {

  app.get('/api/survey', function(req, res) {
    res.json(newPerson);
    //Friends.push(newPerson);
  //  fs.writeFile("friends.js", JSON.stringify(peopleData, null, 3));
  });

  app.get("/all", function(req, res) {
  res.json(friendData);
});

  app.post("/api/survey", function(req, res) {

    console.log(req.body)
  //  console.log(friendData);
    var bestMatch = {};
    var highDifference = 50;

    for (i = 0; i < friendData.length; i++) {

      var totalDifference = 0;

      for (var k = 0; k < 10; k++) {
        var difference = Math.abs(req.body.numbers[k] - friendData[i].numbers[k]);
        totalDifference = totalDifference + difference
        //console.log("Total Difference between "+ friendData[i].name +" : " + totalDifference);
        if (totalDifference < highDifference) {
          highDifference = totalDifference;
          bestMatch = friendData[i];
        }

      }

    }
    res.json(bestMatch);
    //console.log(bestMatch);
  });
}
