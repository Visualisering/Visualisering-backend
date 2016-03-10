"use strict";
const   fs = require('fs'),
        config = JSON.parse(fs.readFileSync('./config.json')),
        store = require("../store/store.js"),
        actions = require("../store/actions"),
        _ = require("lodash");

module.exports = {
    process(commitInfo){
        return Promise.all(commitInfo.commits.map(commit=>{
            return new Promise((resolve, reject)=>{
                resolve({
                        repo: commitInfo.repository.name,
                        owner: commitInfo.repository.owner.name,
                        timestamp: commit.timestamp,
                        message: commit.message,
                        committer: commit.committer.username,
                        filename: commit.modified[0], //handle if this doesn´t exist
                        code: config.defaultCode //handle dynamic codecontent
                    }).then((commits) =>{
                        resolve(commits);
                });
            });
        })).then((commitsArray) =>{
            this.dispatchToMatrix(commitsArray);
        });
    },
    
    //dispatch commits to statetree
    dispatchToMatrix(commits) {
        let commitsToDispatch = _.orderBy(commits, ['timestamp'], ['desc']).splice(-100);
        store.dispatch(actions.addLatestPositions(commitsToDispatch));
    }
};
