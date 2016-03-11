"use strict";
const   fs = require('fs'),
        config = JSON.parse(fs.readFileSync('./config.json')),
        store = require("../store/store.js"),
        actions = require("../store/actions"),
        getCommitsService = require("../services/getcommits-service");

function getFileName(commit){
if(commit.added.length > 0){
    return commit.added[0];
}
else if(commit.modified > 0){
    return commit.modified[0];
}
else {
    return 'file.js';
}
};


module.exports = {
    process(payload){
         return Promise.all(payload.commits.map(commit=>{
             return new Promise((resolve, reject)=>{
               let filename = getFileName(commit);
               getCommitsService.getCodeFromWebhookInfo(payload.repository.owner.name, payload.repository.name, filename)
               .then((content)=>{
                        
                        let code = (content !== undefined) ? content : config.defaultCode; 
                       
                        resolve({
                        repo: payload.repository.name,
                        owner: payload.repository.owner.name,
                        timestamp: commit.timestamp,
                        message: commit.message,
                        committer: commit.committer.name,
                        filename: filename, //handle if this doesn´t exist
                        code: code //handle dynamic codecontent
                    });
               });
             });
         }))
         .then((commitsArray) =>{
            store.dispatch(actions.addLatestWebhookCommits(commitsArray));
        });
    }
};
