"use strict";
const   store = require("../store/store.js"),
        actions = require("../store/actions"),
        cacheService = require('../services/cache-service');

/*==============================================================================
This module extracts data from a github getrequest and when processed dispatches
an array with objects. Statetree is updated and data sent to client matrix module
through websockets.
commitInfo = contains data of commits made to a certain repo.
owner = repo owner
commitFiles = files changed in each commit
==============================================================================*/    
    
module.exports = {
    process(commitInfo, owner, commitFiles) {
        Promise.all(commitInfo.map((item) => {
            let code = '';
            let fileName = '';
            Promise.all(commitFiles.map((file) => {
                
                //extracts changed code in commit
                code += file.patch;
                fileName = file.filename;
            })).then(() => {
                return new Promise((resolve, reject) => {
                    resolve({
                        repo: owner.repos,
                        owner: owner.username,
                        timestamp: item.commit.committer.date,
                        message: item.commit.message,
                        committer: item.committer.login,
                        filename: fileName,
                        code: new Buffer(code).toString('base64')
                    });
                    //when Promise.all on line 19 is fullfilled array with
                    //objects are dispatched and statetree is updated.
                }).then((commitsArray) => {
                    cacheService.cacheCommits(commitsArray)
                    .then(() =>{
                       cacheService.getCachedCommits()
                       .then((commits) =>{
                           store.dispatch(actions.addLatestCommits(commits));
                       });
                    });
                    
                });
            });
        }));
    }
};