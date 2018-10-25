// LIRI
var Movie = require("./Movie");
var Band = require("./Band");

// Create a new Movie object
var Movie = new Movie();
var Band = new Band();


// Store all of the arguments in an array
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");


if (!term) {
  term = 'Mr. Nobody';
}

if (search == 'movie-this') 
{
  Movie.findMovie(term);
} else {
  Band.findBand(term);
}




