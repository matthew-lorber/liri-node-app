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