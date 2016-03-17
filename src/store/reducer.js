"use strict";
const _ = require("lodash"),
        settings = require('../../settings');

module.exports = (currentState, action) => {
    switch (action.type) {
         case settings.action_add_commits:
               let sortedCommits = _.orderBy(action.commits, [settings.sortCommitsBasedOnTime], [settings.sortDescending]);
            return Object.assign({},
                currentState, {
                    commits: sortedCommits
                });
    
        case settings.action_add_positions:
            let sortedPositions = _.orderBy(action.positions, [settings.sortPositionsBasedOnTime], [settings.sortDescending]);
            return Object.assign({},
                currentState, {
                    positions: sortedPositions
                });
      
        default:
            return currentState;
    }
};
