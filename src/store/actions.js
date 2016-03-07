"use strict";
const _ = require("lodash");
const store = require("./store");

module.exports = {
  addLatestCommits(commits) {
    console.log(commits);
    return {type: "ADD_COMMITS", commits};
  },
  addLatestPositions(positions){
    const currentState = store.getState();
    return {type:"ADD_POSTIONS", positions};
  }
};
