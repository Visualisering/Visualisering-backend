"use strict";
const sphere = require("../data-processors/sphere-webhook"),
      matrix = require("../data-processors/matrix-webhook");


// Parse the payload from github, then pass it on to each service to structure
// the data before sending it to frontend
module.exports = {
  process(githubPush) {
    let payload = JSON.parse(githubPush);
    sphere.process(payload.commits);
    matrix.process(payload);
  }
};