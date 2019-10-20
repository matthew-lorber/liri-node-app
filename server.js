// This code creates a simple HTTP server on your local machine.

// create a js file server.js and write the following: 

/* Load the HTTP library */
var http = require("http");

/* Create an HTTP server to handle responses */

http.createServer(function(request, response) {
response.writeHead(200, {"Content-Type": "text/plain"});
response.write("Hello World");
response.end();
}).listen(8888);

// Save the file in a folder named njtest and then execute the file in the command prompt: cd njtest <enter> node server.js <enter>

//Open a browser and go to the URL localhost:8888; the words “Hello World” should appear in your browser window: done

//Kill the server with CTRL-C in the command prompt window; you have now completed and checked your set up of Node.js. If you cannot get the example above to work, troubleshoot and fix it before continuing.