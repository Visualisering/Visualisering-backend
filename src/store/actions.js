<<<<<<< HEAD
// const _ = require("lodash");
=======
"use strict";
const _ = require("lodash");
const store = require("./store");

>>>>>>> add city to file

module.exports = {
  addLatestCommits(commits) {
    return {type: "ADD_COMMITS", commits};
  },
  addLatestPositions(positions){
    // console.log(positions);
    // const currentState = store.getState();
    // console.log(currentState);
    // let newSphereState = _.sortBy(currentState.concat(positions), ["time"]).slice(-100);
    // console.log(newSphereState);
    return {type:"ADD_POSTIONS", positions};
  }
};
