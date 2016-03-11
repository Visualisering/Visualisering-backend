"use strict";
const   request = require("request"),
        fs = require('fs'),
         config = JSON.parse(fs.readFileSync('./config.json'));

/*==============================================================================
This service takes one owner name and repo name as arguments
Sends get request to github that responses with commit info from all commits 
made to that particular repo. Resolves that data back to githubrequest-service
==============================================================================*/
module.exports = {
    latestCommits(owner, repo) {
        return new Promise((resolve, reject) => {
            request({
                url: config.github + owner + '/' + repo + '/commits' + config.numberOfCommits,
                method: 'GET',
                headers: {
                    "User-Agent": "",
                    "Authorization": "token 4d8db6bafe22e480bcebc095bcc8b12e9cf23e21"
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
                url: config.github + owner + '/' + repo + '/commits/' + sha,
                method: 'GET',
                headers: {
                "User-Agent": "",
                "Authorization": "token 4d8db6bafe22e480bcebc095bcc8b12e9cf23e21"
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
                url: config.github + owner  + '/' + repo +'/contents' + filename,
                method: 'GET',
                headers: {
                "User-Agent": "",
                "Authorization": "token 4d8db6bafe22e480bcebc095bcc8b12e9cf23e21"
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