// Dependencies
// ==============================================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('app'));

// Route requiring
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listener
// =============================================================================
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});