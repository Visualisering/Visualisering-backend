"use strict";
const request = require("request");
const sphere = require("../data-processors/sphere");
const store = require("../store/store.js");
const actions = require("../store/actions");

module.exports = {
  process(githubPush){
    let payload = JSON.parse(githubPush); 
        sphere.process(payload.commits)
        .then(function(positionArray){
      store.dispatch(actions.addLatestPositions(positionArray));
     });
        
        
    //plocka ut reponame, filename, repoowner, committers ==> matrix
  }
}