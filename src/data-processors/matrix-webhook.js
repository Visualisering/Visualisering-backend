"use strict";
const   settings = require('../../settings'),
        getCommitsService = require('../services/getcommits-service'),
        cacheService = require('../services/cache-service');

/*==============================================================================
Helper function that returns first added och modified file in a  certain commit
==============================================================================*/ 

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
}
/*==============================================================================
This module extracts data from a github webhook.
commitInfo = contains data of all commits made in push to github 
organization or repo.
getCodeFromWebhookInfo() = extracts changed code in each commit.
When processed, module resolves an array of commits to be cached 
in cache/commits.json
==============================================================================*/ 

module.exports = {
    process(commitInfo){
         return Promise.all(commitInfo.commits.map(commit=>{
             return new Promise((resolve, reject)=>{
               let filename = getFileName(commit);
               getCommitsService.getCodeFromWebhookInfo(commitInfo.repository.owner.name, commitInfo.repository.name, filename)
               .then((content)=>{
                    
                    //use default code if code content comes back empty    
                    let code = (content !== undefined) ? content : settings.defaultCode; 
                    resolve({
                    repo: commitInfo.repository.name,
                    owner: commitInfo.repository.owner.name,
                    timestamp: commit.timestamp,
                    message: commit.message,
                    committer: commit.committer.name,
                    filename: filename, 
                    code: code 
                });
               });
             });
         }))
         //when Promise.all on line 32 is fulfilled cache commits to file
         .then((commitsArray) =>{
            cacheService.cacheCommits(commitsArray);
        });
    }
};