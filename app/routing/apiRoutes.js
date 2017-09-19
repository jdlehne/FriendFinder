var friendData = require("../data/friends.js");//---uses the data from peopleData in friends.js

module.exports = function(app) {
//==== functionality to recieve the newPerson JSON response after they complete survey
  app.get('/api/survey', function(req, res) {
    res.json(newPerson);//
  });
//==================================================================================

//====Used to return all objects from peopleData in friends.js when user clicks 'API Friend List'
  app.get("/all", function(req, res) {
  res.json(friendData);//----------exported from friends.js PeopleData object array
});

//==========https://expressjs.com/en/guide/routing.html===========//


  app.post("/api/survey", function(req, res) {

    console.log("Logging request body: " + req.body.name)
  //console.log(friendData);
    var bestMatch = {};
    var highDifference = 50;

    for (i = 0; i < friendData.length; i++) {

      var totalDifference = 0;

      for (var j = 0; j < 10; j++) {
        var difference = Math.abs(req.body.numbers[j] - friendData[i].numbers[j]);
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
