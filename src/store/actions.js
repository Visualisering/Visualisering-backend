"use strict";
const _ = require("lodash");
const store = require("./store");
module.exports = {
  addLatestCommits(commits){
  return {type:"ADD_COMMITS", commits};
  },
  addLatestPositions(positions){
    console.log('action');
     return {type:"ADD_POSITIONS", positions};
  }
};