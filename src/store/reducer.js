"use strict";
const _ = require("lodash");

module.exports = (currentState, action) => {
  switch (action.type) {

    case "ADD_POSTIONS":
        return Object.assign(
            {},
            currentState,
            {
                positions:action.positions
        });
        
        case "ADD_COMMITS":
        return Object.assign(
            {},
            currentState,
            {
                commits:action.commits
        });
        
    default: return currentState;
    }

};
