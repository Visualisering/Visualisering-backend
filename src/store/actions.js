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
    },
    addLatestWebhookPositions(wh_positions) {
      return {
        type: "ADD_WH_POSITIONS",
        wh_positions
      };
    },
    addLatestWebhookCommits(wh_commits) {
      return {
        type: "ADD_WH_COMMITS",
        wh_commits
      };
    }
};