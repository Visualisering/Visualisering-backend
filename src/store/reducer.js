"use strict";
const _ = require("lodash");

module.exports = (currentState, action) => {
  switch (action.type) {
    case "ADD_POSITIONS":
    let positionsToSendToReducer = _.orderBy(currentState.positions.concat(action.positions), ['time'], ['desc']).splice(-100);
        return Object.assign(
            {},
            currentState,
            {
                positions:positionsToSendToReducer
        });
        
        case "ADD_COMMITS":
        let commitsToSendToReducer = _.orderBy(currentState.commits.concat(action.commits), ['timestamp'], ['desc']).splice(-100);
        return Object.assign(
            {},
            currentState,
            {
                commits:commitsToSendToReducer
        });
        
    default: return currentState;
    }

};
