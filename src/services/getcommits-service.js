"use strict";
const   request = require('request'),
        settings = require('../../settings');
        
//for testing purposes during development "Authorization":"" 1fa3afc8a746e56df1a9c1408f6af8a7ae455965

/*==============================================================================
latestCommits() takes owner name and repo name as arguments
Sends get request to github that responses with commit info from all commits 
made to that particular repo. Resolves data back to githubrequest-service
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

/*==============================================================================
getCommitInfo()  takes owner name, repo name and sha number from a certain 
commit.Gets info on that certain commit from github. Resolves that data back to 
githubrequest-service.This function is very similar to the one below but JSON 
data differs alot between a request to github and a real time webhook.
==============================================================================*/    
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

/*==============================================================================
getCodeFromWebhookInfo() takes owner name, repo name and filename from a 
certain commit. Gets info on that certain commit from github. 
Resolves that data back to webhook-service. This function is very similar to the
one above but JSON data differs alot between a request to github and a real time
webhook.
==============================================================================*/
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
