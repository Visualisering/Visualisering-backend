"use strict";
const _ = require("lodash");
const store = require("./store");

module.exports = {
  addLatestPositions(positions){
    return {type:"ADD_POSTIONS", positions};
  }
};
