const request = require("request");
const moment = require('moment');
var fs = require("fs");

// Create the TV constructor
var Band = function () {
    // divider will be used as a spacer between the tv data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";

    // findActor takes in the name of an actor to search for
    this.findBand = function (artist) {
        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events/?app_id=codingbootcamp";

        request(queryUrl, function (err, response, body) {
            // Parse the response body (string) to a JSON object
            // Grab the first index of the response array, access the object at the artist  key

            let jsonData = JSON.parse(body)[0];
            let date = moment(jsonData.datetime).format('MM/DD/YYYY');


            // bandData ends up being the string containing the show data we will print to the console
            var bandData = [
                "Venue: " + jsonData.venue.name,
                "Location: " + jsonData.venue.city,
                "Date of Event: " + date
            ].join("\n\n");

            // Append movieData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", bandData + divider, function (err) {
                if (err) throw err;
                console.log(bandData);
            });
    };
};

module.exports = Band;