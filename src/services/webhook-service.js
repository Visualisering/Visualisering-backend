"use strict";
const request = require("request");
const sphere = require("../data-processors/sphere-webhook");
const matrix = require("../data-processors/matrix-webhook");
const store = require("../store/store.js");
const actions = require("../store/actions");

// Parse the payload from github, then pass it on to each service to structure
// the data before sending it to frontend
module.exports = {
  process(githubPush) {
   
    sphere.process(githubPush.commits);
    matrix.process(githubPush);
  }
};