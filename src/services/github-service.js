"use strict";
const request = require("request");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
const repoArray = require(config.repoArray);
const owners = require("../../datasets/repos");
const sphere = require("../data-processors/sphere");
const store = require("../store/store.js");
const actions = require("../store/actions");


module.exports  = {

  initDataFetching(){
      this.fetchData().then((payload)=>{
      sphere.process(payload.commits)
      })
      .then((positionArray) => {
            console.log(positionArray);
            store.dispatch(actions.addLatestCommits(positionArray));
          });
      },
  latestCommits(owner, repo){
    const options = {
      headers: {
        "User-Agent": "rk222ev@student.lnu.se"
      },
      url: config.github + owner + '/' + repo + '/commits' + config.numberOfCommits
    };
    return new Promise((resolve, reject) => {
      request.get(options, (err, res) => {
        console.log(err);
            let commits = JSON.parse(res.body);
            console.log(commits);
        err ? reject(err)
            : resolve(commits.map(commit => commit));
      });
    });
  },
 
 fetchData() {
        return Promise.all(repoArray.map(owner => {
            return new Promise((resolve, reject) => {
                this.latestCommits(owner.username,owner.repos)
                    .then((info) =>{
                      resolve(info);
                      /*resolve({   lng: position.lng,
                                            lat: position.lat,
                                            time: Date.parse(commit.timestamp)});*/
                       
                });
            });
        }));
    }
};




