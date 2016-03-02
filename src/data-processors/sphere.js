"use strict";
const githubService = require("../services/github-service");
const webhookService = require("../services/webhook-service");
const studentService = require("../services/student-service");
const geoLocationService = require("../services/geolocation-service");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

module.exports = {
    process(githubPayload){
        let githubPush = JSON.parse(githubPayload);
        return new Promise((resolve, reject) =>{
            let newCommit = {
                username: githubPush.head_commit.committer.username,
                timestamp: githubPush.head_commit.timestamp,
                message: githubPush.head_commit.message,
                owner: githubPush.repository.owner.name,
                lat: undefined,
                lng: undefined,
                blobs: undefined
            };

                console.log(newCommit.username);
            studentService.find_by_username(newCommit.username)
                .then(function(student){
                    console.log("student från sphere" + student.city);
                    geoLocationService.getPosition(student.city)
                        .then(function(position){
                            newCommit.lat = position.lat;
                            newCommit.lng = position.lng;
                        });
                    webhookService.getBlobs(githubPush)
                        .then(function(student){
                        //här ska positionen hämtas
                        }); 
                })
                .catch(function(err) {
                console.log("Failed:", err);
                });              
        });
    }
};

 /* dataSet() {
    return new Promise((resolve, reject) => {
      githubService.getBlobs()
                  .then(process)
                  .then(resolve)
                  .catch();
    });
  }*/
