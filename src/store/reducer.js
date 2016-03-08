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
        
    default: return currentState;
    }

};
