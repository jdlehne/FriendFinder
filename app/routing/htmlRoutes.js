var path = require("path");

module.exports = function(app){
// route to survey page
  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/../public/survey.html"));
  });

  // send users to home page if no other route specified
  app.use(function(req, res){
    res.sendFile(path.join(__dirname + "/../public/home.html"));
  });
}
