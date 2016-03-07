"use strict";
const _ = require("lodash");

module.exports = (currentState, action) => {
  switch (action.type) {
  case "ADD_COMMITS":
    return Object.assign(
      {},
      currentState,
      {
        commits: currentState.commits.concat(action.commits)
      });

    case "ADD_POSTIONS":
        return Object.assign(
            {},
            currentState,
            {
                sphere:{
                    data: currentState.sphere.data.concat(action.positions)
                }
        });
        
    default: return currentState;
    }

};
