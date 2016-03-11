"use strict";
const _ = require("lodash");
const store = require("./store");
module.exports = {
  addLatestCommits(commits){
  return {type:"ADD_COMMITS", commits};
  },
  addLatestPositions(positions){
     return {type:"ADD_POSITIONS", positions};
  },
  addLatestWebhookPositions(wh_positions){
    console.log('action creator');
     return {type:"ADD_WH_POSITIONS", wh_positions};
  }
};