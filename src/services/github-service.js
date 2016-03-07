"use strict";
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
const owners = require("../../datasets/repos");
const sphere = require("../data-processors/sphere-getrequest");
const store = require("../store/store.js");
const actions = require("../store/actions");

//den här kommer bli överflödig ränker om vi kallar på metod i sphere request från app.js
//kanske....
module.exports  = {
  initDataFetching(){
 sphere.process();
    
    // .then((positionArray)=>{
    //     store.dispatch(actions.addLatestCommits(positionArray));
    //});
  }
};
  
 





