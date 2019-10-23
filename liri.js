/* Node.js API CALLs WITH KEYS IN ENVELOPE, OUTPUT TO TEXT FILE */

// Load the API keys that are hidden in the .env file, which is listed in the .gitignore
require("dotenv").config();

// Retrieve the API keys from the .env
var keys = require("./keys.js");

// Load the target API
var Spotify = require('node-spotify-api');

// Define the API call
var spotify = new Spotify(keys.spotify);

// Node.js file system module for outputting the console log to a text file (liri_console_log.txt)
var fs = require("fs");

// Node.js request module
var request = require("request");

// Moment.js module
var moment = require("moment");

// Define (1) which API to call, and (2) what to call for
var whichAPI = process.argv.slice(2,3).toString();
var getThis = process.argv.slice(3).join(" ").toString();

// Send user input to switch
switchCalls(whichAPI, getThis);

/* SWITCH FOR API CALLS */
function switchCalls(whichAPI, getThis) {

   // NOTE: One should do error handing at input, before switch, except, project instructions were clear in that this program has limited error handling; program is written as specified.
   switch(whichAPI) {
      case 'concert-this':
         concertThis(getThis);
      break;
      case 'spotify-this-song':
         spotifyThis(getThis);
      break;
      case 'movie-this':
         movieThis(getThis);
      break;
      case 'do-what-it-says':
         doTheDefault();
      break;
      default:
         console.log("\n\n  🤔  Not sure what you're trying for. Typo, maybe? Care to try again?  🤔  \n\n");
   }
}

/* CONCERT */
function concertThis(getThis){

   // replace any spaces in the search string so it parses to the http request
   var getThis = getThis.split(" ").join("%20"); console.log(getThis);

   var queryUrl = "https://rest.bandsintown.com/artists/" + getThis + "/events?app_id=codingbootcamp";
   
   request(queryUrl, function(err, response, body) {

       if (!err && response.statusCode === 200) {

           var concerts = JSON.parse(body);

           for (var i=0; i<concerts.length; i++) {

               // parse concert date object to format spec'd in instructions
               var concertDate = moment(concerts[i].datetime).format('MM/DD/YYYY'); console.log('datetime',concertDate);

               // split and put search string back together with spaces
               var concert = "🎶🎶🎶\n" + concerts[i].venue.name + "\n" + concerts[i].venue.city + "\n" + concertDate + "\n\n";

               // output to console and .txt file
               console.log(concert);  
               fs.appendFileSync("liri_console_log.txt", concert);
           }

      } else {
         return console.log('🤔🤔❕No concert for you (error): ', err);
      }

   });
}

/* SPOTIFY */
function spotifyThis(getThis) {

   // no song error handling
   if (getThis === undefined) {
      getThis = "I Want it That Way";
      console.log("You didn't tell me what song to search for. I'm guessing you wanted it that way?");
   }

   // spotify search with object return
   spotify
   .search({
      type: 'track', 
      query: getThis 
   })
   .then(function(response) {

      var myLog = "liri_console_log.txt";
      var songs = response.tracks.items;

      for (var i=0; i<songs.length; i++) {

         var song = songs[i];
         var entry = "🍉 " +
                     song.name + "\n" +
                     song.preview_url + "\n" +
                     song.album.name + "\n" +
                     song.artists[0].name + "\n\n";

         // console logging results and writing to .txt
         console.log(entry);
         fs.appendFileSync(myLog, entry, function(error) {
            if (error) {
               return console.log("🙃" + " .txt log fail " + "🙃");
            }
         });
      }
   })
   // call error handling
   .catch(function(err) {
      return console.log("❕❕❕ Error in API call: ", err);
   });
}

/* MOVIE */
function movieThis(getThis){

   // no movie in getThis error handling
   if (getThis === undefined) {

      getThis = "Mr. Nobody";
      var durrMsg = "🙃If you haven't watched 'Mr. Nobody,' then you should: 'http://www.imdb.com/title/tt0485947/' \nIt's on Netflix!🙃";
      
      console.log(durrMsg);
      fs.appendFileSync("liri_console_log.txt", durrMsg);
   }

   // replace any spaces in the search string
   var getThis = getThis.split(" ").join("%20");

   var queryUrl = "http://www.omdbapi.com/?t=" + getThis + "&y=&plot=short&apikey=trilogy";

   // call
   request(queryUrl, function(err, response, body) {
      
      // if no errors then proceed
      if (!err && response.statusCode === 200) {

         var movie = JSON.parse(body);

         // get Rotten Tomatoes rating
         var rottenRating = movie.Ratings.find(function(thing) {
            return thing.Source === "Rotten Tomatoes";
         }).Value;

         // log and write to .txt
         var movie = "🎞️" + " " +
               movie.Title + "\n" + "Released: " +
               movie.Released + "\n" + "Rated: " +
               movie.Rated + "\n" + "RottenRating: " +
               rottenRating + "\n" + "Country: " +
               movie.Country + "\n" + "Language(s): " +
               movie.Language + "\n" + "Plot: " +
               movie.Plot + "\n" + "Actors: " +
               movie.Actors;

         // output to console and .txt file
         console.log(movie);  
         fs.appendFileSync("liri_console_log.txt", movie);
      
      // request error handling
      } else {
         console.log('🤔' + 'No movie for you (error): ', err);
      }

   });
}

/* DEFAULT CASE FOR API SWITCH */
function doTheDefault() {
   
   // get 'random' text from 'random.txt' file (spotify-this-song,I Want it That Way)
   fs.readFile('random.txt', 'UTF-8', function(error, data) {
      if (error) {
         return console.log("❕Error reading random.txt❕: ", error, "❕🙃");
      } else {
         var splitsville = data.toString().split(","); console.log(splitsville);
         switchCalls(splitsville[0], splitsville[1]);
      }
   });
}