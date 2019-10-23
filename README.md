# LIRI Bot

## Overview

LIRI ([video here](matthew-lorber.github.io/liri-node-app)) is like iPhone's SIRI; however, while SIRI is a speech interpretation and recognition interface, LIRI is a **language** interpretation and recognition interface. That is, LIRI is a command line node app that takes in parameters and gives you back data it fetches from APIs. LIRI will: search Spotify for songs; search Bands in Town for concerts; and search OMDB for movies.

## Technology

    * [Node.js](https://nodejs.org)
    * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
    * [Axios](https://www.npmjs.com/package/axios)
    * [OMDB API](http://www.omdbapi.com)
    * [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
    * [Moment](https://www.npmjs.com/package/moment)
    * [DotEnv](https://www.npmjs.com/package/dotenv)
   
## How to Use

LIRI is a CLI app that has four possible commands:

    concert-this
    spotify-this-song
    movie-this
    do-what-it-says

Initiate by typing:

    node liri.js <command> <search string>

Example:

    node liri.js spotify-this-song it's raining men

## Video

If you can't see the video here, download the raw (liriBotTest.mp4) from the repo, or view the published README at matthew-lorber.github.io/liri-node-app.

<video controls src="liriBotTest.mp4" width="640" height="480" alt="liriBotTest.mp4"></video>

### How to Install

### Instructions

1. You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API. The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step A: Visit <https://developer.spotify.com/my-applications/#!/>

   * Step B: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step C: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step D: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

2. Create a file named `.env` in the root directory and add the following text to it, except, replace __your-spotify-id__ and __your-spotify-secret__ with your own keys.

    ```js
    # Spotify API keys

    SPOTIFY_ID=your-spotify-id
    SPOTIFY_SECRET=your-spotify-secret

    ```

This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since I'm gitignoring this file, my keys (and yours if you clone or fork this to your GitHub) won't be pushed to github &mdash; keeping everyone's API key information private.

## What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "I Want it That Way" by the Backstreet Boys (change in random.txt if desired, it was baked into the original assignment at Rutgers).

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody' prepended by the following:

     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

   * You'll use the `axios` package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You can get a free OMDB API key [here](http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0x0euvR%2FzVv1jLU3mGetH4R3kWtYKWACCaYcfoP1IY8g%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU5GG7XylwYou%2BzznFv7FbZmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulN6vYN8IikxxqwtGWTciOwQ4e4xie4N992dlfbpyqd1D&at=freeAcct&Email=).

4. `node liri.js do-what-it-says`

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.


## One More Thing

If you have any questions about this project or the material here, please post them in the community channels in StackOverflow so that your fellow developers can help you!

**Good Luck!**

[MIT](https://opensource.org/licenses/MIT) &copy; 2019 Matthew Lorber, M.Ed
