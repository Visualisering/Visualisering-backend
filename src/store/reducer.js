"use strict";
const _ = require("lodash");

module.exports = (currentState, action) => {
    switch (action.type) {
        case "ADD_POSITIONS":
            let sortedPositions = _.orderBy(action.positions, ['time'], ['desc']);
            return Object.assign({},
                currentState, {
                    positions: sortedPositions
                });
        case "ADD_COMMITS":
               let sortedCommits = _.orderBy(action.commits, ['timestamp'], ['desc']);
            return Object.assign({},
                currentState, {
                    commits: sortedCommits
                });
        default:
            return currentState;
    }
};
