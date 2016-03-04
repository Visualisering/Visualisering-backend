const initialState = require("./initial-state");
const _ = require("lodash");

module.exports = (currentState, action) => {
  switch (action.type) {
  case "ADD_COMMITS":
    return Object.assign(
            {},
            currentState, 
            {
                matrix:{
                    data:currentState.matrix.data.concat(action.commits)
            }
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
            
    default: return currentState || initialState;
    }
    
};
