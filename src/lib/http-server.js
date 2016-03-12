"use strict";
const http = require('http'),
      webhookService = require('../services/webhook-service');

/*==============================================================================
This module returns a new server instance and handles routing.
Endpoint /commit is where github webhook sends a POST with JSON body when
a push is made to an organization with an active webhook.
==============================================================================*/
module.exports = {

  init() {
    let server = http.createServer((req, res) => {
      //routes
      switch (req.url) {
      case "/":
        console.log("[501] " + req.method + " to " + req.url);
        res.writeHead(501, "Not implemented", {"Content-Type": "text/html"});
        res.end("<html><head><title>501 - Not implemented</title></head><body><h1>Not implemented!</h1></body></html>");
        break;
      
      //Would handle the webhook post from github.
      case '/commit':
        if (req.method == 'POST') {
          let data = '';
          
          //concatenates json response
          req.on('data', function(chunk) {
              data += chunk;
          });

          //Sends data to webhook-service for further processing 
          req.on('end', function() {
            if(data.length > 0){
              try{
                let githubPush = JSON.parse(data);
                webhookService.process(githubPush);
                res.writeHead(200, "OK", {'Content-Type': 'text/html'});
                res.end();
              }
              catch(err){
                console.log(err);
                console.log('not valid X-GitHub-Event: push');
                res.writeHead(400, "Bad request", {'Content-Type': 'text/html'});
                res.end('<html><head><title>400 - Bad request </title></head><body><h1>Bad request.</h1><p>Please send valid X-GitHub-Event: push </p></body></html>');
              }
            }
            else{
              console.log('[400] body cannot be empty');
              res.writeHead(400, "Bad request", {'Content-Type': 'text/html'});
              res.end('<html><head><title>400 - Bad request </title></head><body><h1>Bad request.</h1><p>Body cannot be empty</p></body></html>');
            }
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
      }
    }).listen(process.env.PORT || 5000);

    return server;
  }
};
