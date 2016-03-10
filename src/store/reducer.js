"use strict";
const _ = require("lodash");

module.exports = (currentState, action) => {
          console.log('reducer');
  switch (action.type) {
    // triggar detta caset?  NI kan logga inne för vara säkra, e det denna ni vill köra? jag har inte så mkt koll
    case "ADD_POSITIONS":
    let newState = currentState.positions.concat(action.positions);
    let positionsToSendToReducer = _.orderBy(newState, ['time'], ['desc']).splice(-100);
  
    console.log('langd'+currentState.positions.length);
    
        return Object.assign(
            {},
            currentState,
            {
                positions:positionsToSendToReducer
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
