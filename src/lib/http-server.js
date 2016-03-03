"use strict";
const http = require('http');
const webhookService = require('../services/webhook-service');

module.exports = {

  init() {
    let server = http.createServer((req, res) => {
      // set up some routes
      switch (req.url) {
      case "/":
        console.log("[501] " + req.method + " to " + req.url);
        res.writeHead(501, "Not implemented", {"Content-Type": "text/html"});
        res.end("<html><head><title>501 - Not implemented</title></head><body><h1>Not implemented!</h1></body></html>");
        break;
        // Would handle the webhook post from github.
        case '/commit':
          if (req.method == 'POST') {
            let data = '';
            req.on('data', function(chunk) {
                data += chunk;
                           

            });
            req.on('end', function() {
              
              webhookService.process(data);
              res.writeHead(200, "OK", {'Content-Type': 'text/html'});
              res.end();
            });
          
          } else {
            console.log("[405] " + req.method + " to " + req.url);
            res.writeHead(405, "Method not supported", {'Content-Type': 'text/html'});
            res.end('<html><head><title>405 - Method not supported</title></head><body><h1>Method not supported.</h1></body></html>');
          }

          break;

        default:
          res.writeHead(404, "Not found", {'Content-Type': 'text/html'});
          res.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
          console.log("[404] " + req.method + " to " + req.url);
      };
    }).listen(process.env.PORT || 5000);

    return server;
  }
};
