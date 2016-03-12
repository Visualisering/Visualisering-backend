"use strict";

const   getCommitsService = require('../services/getcommits-service'),
        sphereProcessor = require('../data-processors/sphere-getrequest'),
        matrixProcessor = require('../data-processors/matrix-getrequest'),
        settings = require('../../settings'), 
        repoArray = require(settings.repoArray);

/*==============================================================================
Process-method iterates over predefined repos from datasets/repos.json
Sends getrequest to github through getCommitsService.latestCommits.
Response comes back containing info from all commits made to those repos.
Sends that commitdata to sphereProcessor and matrixProcessor to be processed
and dispatched.
==============================================================================*/
module.exports = {
    process() {
        repoArray.map(owner => {
            getCommitsService.latestCommits(owner.username, owner.repos)
            .then((commitInfo) => {
                sphereProcessor.process(commitInfo);
                getCommitsService.getCommitInfo(owner.username, owner.repos, commitInfo[0].sha)
                .then((specificCommit) => {
                    matrixProcessor.process(commitInfo, owner, specificCommit.files);
                });
            });
        });  
    }
}; 