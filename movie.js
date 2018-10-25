var request = require("request");
var fs = require("fs");

// Create the TV constructor
var Movie = function() {
  // divider will be used as a spacer between the tv data we print in log.txt
  var divider = "\n------------------------------------------------------------\n\n";

  // findActor takes in the name of an actor to search for
  this.findMovie = function(movie) {
    // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(err, response, body) {
      // Parse the response body (string) to a JSON object
      // Grab the first index of the response array, access the object at the `person` key
      var jsonData = JSON.parse(body);

      // actorData ends up being the string containing the show data we will print to the console
      var movieData = [
        "Movie: " + jsonData.Title,
        "Release Year: " + jsonData.Year,
        "Rating: " + jsonData.imdbRating,
        // "Rotten Tomato Rating: " + jsonData.Ratings,
        "Language: " + jsonData.Language,
        "Country:" + jsonData.Country,
        "Actors:" + jsonData.Actors,
        "Plot:" + jsonData.Plot
      ].join("\n\n");

      // Append movieData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", movieData + divider, function(err) {
        if (err) throw err;
        console.log(movieData);
      });
    });
  };
};

module.exports = Movie;
