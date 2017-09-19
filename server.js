// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000; //-----process.env.PORT || 3000 means: whatever is in the
//--environment variable PORT, or 3000 if there's nothing there.

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"//---JSON API has been properly registered with the IANA. Its media type designation is application/vnd.api+json.
                                  //--More info at: http://jsonapi.org/ --------------
}));
app.use(express.static(__dirname + '/app/public'));//-----To serve static files such as images, CSS files, and JavaScript files, --
//---use the express.static built-in middleware function in Express. https://expressjs.com/en/starter/static-files.html

//====================================================================

// directs server to the route files
require("./app/routing/apiRoutes")(app);//---------Gets exported api route module defined in routing folder
require("./app/routing/htmlRoutes")(app);//---------Gets exported html route module

// listener signaling server start
app.listen(PORT, function(){
  console.log("App listening on PORT: " + PORT);
});
