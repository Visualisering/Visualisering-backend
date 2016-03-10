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
                    "User-Agent": "rk222ev@student.lnu.se",
                    "Authorization": "token 9af1e0896036608e8d992e6d54faf4d0f6e4e653"
                }
            }, function(error, response, body) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                 //   console.log(body);
                    resolve(JSON.parse(body)); 
                }
            });
        });
    }
};