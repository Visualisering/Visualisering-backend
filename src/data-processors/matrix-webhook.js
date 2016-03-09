"use strict";
const   fs = require('fs'),
        config = JSON.parse(fs.readFileSync('./config.json'));

module.exports = {
    process(payload){
        return Promise.all(payload.commits.map(commit=>{
            return new Promise((resolve, reject)=>{
                resolve({
                        repo: payload.repository.name,
                        owner: payload.repository.owner.name,
                        timestamp: commit.timestamp,
                        message: commit.message,
                        committer: commit.committer.username,
                        filename: commit.modified[0], //handle if this doesn´t exist
                        code: config.defaultCode //handle dynamic codecontent
                    });
            });//we have to add dispatch here
        }));
    }
};