// LIRI
require('dotenv').config()
var keys = require("./key.js");
var request = require('request');
const Spotify = require('node-spotify-api');
var fs = require('fs');


// Store all of the arguments in an array
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

// divider between movies
var divider = "\n------------------------------------------------------------\n\n";

if (!term) {
  term = 'Mr. Nobody';
}
if (search == "movie-this") {
  showMovie(term);
}


function showMovie(term) {
  if (search == "") {
    term = 'Mr. Nobody';
  }

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      var jsonData = JSON.parse(body);

      var showData = [
        "Movie: " + jsonData.Title,
        "Release Year: " + jsonData.Year,
        "Rating: " + jsonData.imdbRating,
        "Rotten Tomatoe Rating: " + jsonData.Rating,
        "Language: " + jsonData.Language,
        "Country:" + jsonData.Country,
        "Actors:" + jsonData.Actors,
        "Plot:" + jsonData.Plot
      ].join("\n\n");

      fs.appendFile("log.txt", showData + divider, function (err) {
        if (err) throw err;
        console.log(showData);

      });
    }
  });
}