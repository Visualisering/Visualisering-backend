"use strict";
const _ = require("lodash"),
      store = require("./store");

module.exports = {
  addLatestCommits(commits) {
      return {
        type: "ADD_COMMITS",
        commits
      };
    },
    addLatestPositions(positions) {
      return {
        type: "ADD_POSITIONS",
        positions
      };
    }
};