// const _ = require("lodash");

module.exports = {
  addLatestCommits(commits) {
    return {type: "ADD_COMMITS", commits};
  },
  addLatestPositions(positions){
    console.log(positions);
    return {type:"ADD_POSTIONS", positions};
  }
};
