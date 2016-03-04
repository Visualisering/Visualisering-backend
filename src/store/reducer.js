"use strict";
const _ = require("lodash");

module.exports = (currentState, action) => {
  switch (action.type) {
  case "ADD_COMMITS":
    return Object.assign(
      {},
      currentState,
      {
        commits: action.commits
      });

    default: return currentState;
    }

};
