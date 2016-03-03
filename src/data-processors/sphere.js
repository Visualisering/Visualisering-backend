"use strict";
const githubService = require("../services/github-service");
const webhookService = require("../services/webhook-service");
const studentService = require("../services/student-service");
const geoLocationService = require("../services/geolocation-service");
const store = require("../store/store.js");
const actions = require("../store/actions");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
module.exports= {
    process(commits) {
        return Promise.all(commits.map(commit => {
            return new Promise((resolve, reject) => {
            studentService.find_by_username(commit.author.username)
                    .then(function(student){
                    geoLocationService.getPosition(student.city)
                    .then(position => { 
                        
                        resolve({   lng: position.lng,
                                    lat: position.lat,
                                    time: Date.parse(commit.timestamp)})});
                });
            });
        }));
    }      
};   
