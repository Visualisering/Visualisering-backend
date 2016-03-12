"use strict";
const   request = require('request'),
        settings = require('../../settings');

/*==============================================================================
latestCommits() takes owner name and repo name as arguments
Sends get request to github that responses with commit info from all commits 
made to that particular repo. Returns data back to githubrequest-service
==============================================================================*/
module.exports = {
    latestCommits(owner, repo) {
        return new Promise((resolve, reject) => {
            request({
                url: settings.github + owner + '/' + repo + '/commits' + settings.numberOfCommits,
                method: 'GET',
                headers: {
                    "User-Agent": ""
                }
            }, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve(JSON.parse(body)); 
                }
            });
        });
    },
    
    getCommitInfo: (owner, repo, sha) => {
        return new Promise((resolve, reject) => {
            request({
                url: settings.github + owner + '/' + repo + '/commits/' + sha,
                method: 'GET',
                headers: {
                "User-Agent": ""
                }
            }, function(error, response, body){
                if(error){
                    console.log(error);
                reject(error);
                }
                else{
                    resolve(JSON.parse(body));
                }
            });
        });
    },
    getCodeFromWebhookInfo(owner, repo, filename){
          return new Promise((resolve, reject) => {
            request({
                url: settings.github + owner  + '/' + repo +'/contents' + filename,
                method: 'GET',
                headers: {
                "User-Agent": ""
                }
            }, function(error, response, body){
                if(error){
                    console.log(error);
                reject(error);
                }
                else{
                    resolve(JSON.parse(body).content);
                }
            });
        });
    }
};