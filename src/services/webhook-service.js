"use strict";
const request = require("request"),
      sphere = require("../data-processors/sphere-webhook"),
      matrix = require("../data-processors/matrix"),
      store = require("../store/store.js"),
      actions = require("../store/actions");

// Parse the payload from github, then pass it on to each service to structure
// the data before sending it to frontend
module.exports = {
  process(githubPush){
    let payload = JSON.parse(githubPush);
    sphere.process(payload.commits)
      .then((sphereData) => {
        store.dispatch(actions.addLatestPositions(sphereData));
      });
    matrix.process(payload)
      .then((matrixData) =>{
        store.dispatch(actions.addLatestCommits(matrixData));
      });
    }
};
