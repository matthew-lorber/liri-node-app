/* Node.js API CALLs WITH KEYS IN ENVELOPE, OUTPUT TO TEXT FILE */

// Load the API keys that are hidden in the .env file, which is listed in the .gitignore
require("dotenv").config();

// Retrieve the API keys from the .env
var keys = require("./keys.js");

// Load the target API
var Spotify = require('node-spotify-api');

// Define the API call
var spotify = new Spotify(keys.spotify);

// Node.js file system module for outputting the console log to a text file (named myLog)
var fs = require("fs");

// Define (1) which API to call, and (2) what to call for
function getSomeInput() {
   console.log("🔍🔍🔍 give me some input 🔎🔎🔎");
   console.log("tell me where to search using the following: \n🔭concert-this for concert info\n🔭spotify-this-song for song info\n🔭movie-this for movie info\n🔭do-what-it-says for a '😉random😉' search\n");
   console.log("your search string comes after\noverall, your query has to be like this:\n\n");
   console.log("node liri.js spotify-this-song ")
   var whichAPI = process.argv.slice(1,1);
   var getThis = process.argv.slice(2).join(" ");
   switchCalls(whichAPI, getThis);
}

/* SWITCH FOR API CALLS */
function switchCalls(whichAPI, getThis) {

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
         console.log("\n\n🤔🤔🙃 Not sure what you're trying for. Care to try again? 🤔🤔🙃\n\n");
         getSomeInput();
   }
}

/* CONCERT */
function concertThis(getThis){

   // replace any spaces in the search string so it parses to the http request
   var getThis = getThis.split(" ").join("%20");

   var queryUrl = "https://rest.bandsintown.com/artists/" + getThis + "/events?app_id=codingbootcamp";
   
   request(queryUrl, function(err, response, body) {

       if (!err && response.statusCode === 200) {

           var concerts = JSON.parse(body);

           for (var i=0; i<concerts.length; i++) {

               // parse concert date object to format spec'd in instructions
               var concertDate = moment(concerts[i].datetime).format('MM/DD/YYYY');

               // split and put search string back together with spaces
               var concert = "🎶🎶🎶" + getThis.split("%20").join(" ") + "🎶🎶🎶\n" + concerts[i].venue.name + "\n" + concerts[i].venue.city + "\n" + concertDate + "\n";

               // output to console and .txt file
               console.log(concert);  
               fs.appendFile("liri_console_log.txt", concert);
           }

       } else {
           console.log('🤔🤔🙃No concert for you (error): ', err);
       }

   });
}

/* SPOTIFY */
function spotifyThis(getThis) {
   spotify
   .search({
      type: 'track', 
      query: getThis 
   })
   .then(function(response) {
      console.log(response);
      fs.appendFile(myLog, response, function(error) {
         if (error) {
            console.log("🙃.txt log fail🙃");
         } else {
            console.log("😂.txt log success😂");
         }
      });
   })
   .catch(function(err) {
      console.log("🙃error in API call: ", err);
   });
}

/* MOVIE */
function movieThis(getThis){

   // if case was movieThis but no movie was spec'd, do Mr. Nobody
   if (getThis === undefined) {

      getThis = "Mr.%20Nobody";
      var durrMsg = "🙃If you haven't watched 'Mr. Nobody,' then you should: 'http://www.imdb.com/title/tt0485947/' \nIt's on Netflix!🙃";
      
      console.log(durrMsg);
      fs.appendFile("liri_console_log.txt", durrMsg);
   }

   // replace any spaces in the search string so it parses to the http request
   var getThis = getThis.split(" ").join("%20");

   var queryUrl = "http://www.omdbapi.com/?t=" + getThis + "&y=&plot=short&apikey=trilogy";

   request(queryUrl, function(err, response, body) {

      if (!err && response.statusCode === 200) {

      var movies = JSON.parse(body);

      for (var i=0; i<movies.length; i++) {

         // get Rotten Tomatoes rating
         var rottenRating = movies[i].Ratings.find(function(thing) {
            return thing.Source === "Rotten Tomatoes";
         }).Value;

         // split and put search string back together with spaces
         var movie = "🎞️🎞️🎞️" + getThis.split("%20").join(" ") + "🎞️🎞️🎞️\n" + movies[i].Title + "\n" + movies[i].Year + "\n" + movies[i].imdbRating + "\n" + rottenRating + "\n" + movies[i].Country + "\n" + movies[i].Language + "\n" + movies[i].Plot + "\n" + movies[i].Actors

         // output to console and .txt file
         console.log(movie);  
         fs.appendFile("liri_console_log.txt", movie);
      }

      } else {
         console.log('🤔🤔🙃No movie for you (error): ', err);
      }

   });
}

/* DEFAULT CASE FOR API SWITCH */
function doTheDefault(durrMsg) {

   // get 'random' text from 'random.txt' file (Mr. Nobody)
   fs.readFile('random.txt', (err, data) => {
      if (err) throw err;
      console.log("🙃Error: ", data, "!🙃");
   });
   console.log(durrMsg);
   data = data.split(",");
   switchCalls(data[0], data[1]);
}

getSomeInput();