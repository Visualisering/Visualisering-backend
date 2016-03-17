"use strict";
const settings = require('../../settings');

/*==============================================================================
Creates actions for updating statetree.
==============================================================================*/    
module.exports = {
  addLatestCommits(commits) {
      return {
        type:settings.add_commits,
        commits
      };
    },
    addLatestPositions(positions) {
      return {
        type:settings.add_positions,
        positions
      };
    }
};