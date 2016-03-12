"use strict";
const   request = require('request'),
        settings = require('../../settings');

/*==============================================================================
latestCommits() takes owner name and repo name as arguments
Sends get request to github that responses with commit info from all commits 
made to that particular repo. Returns data back to githubrequest-service
==============================================================================*/
//token för github att använda lokalt token  "Authorization":"" 1fa3afc8a746e56df1a9c1408f6af8a7ae455965
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
<<<<<<< HEAD
                "User-Agent": ""
=======
                "User-Agent": "",
                "Authorization":"token 624d253ab674a90ddf6272f2b6896cceceaf89b9"

>>>>>>> cd5c3d17e93d51765ff65d3ec3267cbd5ae0a6f6
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
