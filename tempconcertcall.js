
function concertThis(getThis){

    var queryUrl = "https://rest.bandsintown.com/artists/" + getThis + "/events?app_id=codingbootcamp";
    
    request(queryUrl, function(err, response, body) {

        if (!err && response.statusCode === 200) {

            var concerts = JSON.parse(body);

            for (var i=0; i<concerts.length; i++) {
                // parsing datetime objects to the format called for in hw_instructions
                var concertDate = moment(concerts[i].datetime).format('MM/DD/YYYY');
                var concert = concerts[i].venue.name + "\n" + concerts[i].venue.city + "\n" + concertDate;
                console.log("🎶🎶🎶" + getThis + "🎶🎶🎶\n", concert, "\n");  
                fs.appendFile("liri_console_log.txt", concert);
            }

        } else {
            console.log('🤔🤔🙃No concert for you (error): ', err);
        }

    });
}