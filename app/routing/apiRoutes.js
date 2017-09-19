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
    //console.log("Logging request id: " + req.body.name)//----debug to check incoming response name
    //console.log(friendData); //----debug to check full array of incoming people data from friends.js
    var bestMatch = {};//---Empty object to be filled be closest mathematical match based on answers
    var highDifference = 50;//--Largest gulf of difference for 10 (5)pt questions

    for (i = 0; i < friendData.length; i++) {//---Loops through all objects in friends.js

      var totalDifference = 0;//---Declares and sets the totalDifference to be empty for now

      for (var j = 0; j < 10; j++) {//---Loops through all 10 stored survey numbers and compares them
        var difference = Math.abs(req.body.numbers[j] - friendData[i].numbers[j]);//--sets a new difference
        //--TBD by the "absoulte differece" between the incoming scores and the stored numbers of friend objects
        totalDifference = totalDifference + difference//--sets the totalDifference to hold the resulting math

        //=====Debug show culmative score as loops through questions====//
        //console.log("Total Difference between "+ friendData[i].name +" : " + totalDifference);

        if (totalDifference < highDifference) {//
          highDifference = totalDifference;
          bestMatch = friendData[i];
        }

      }

    }
    res.json(bestMatch);//---Sends the match back to Post
    //console.log("Displaying below best match object from friends.js");
    //----Logging to check proper object was returned---
    //console.log(bestMatch);
  });
}
