"use strict";
const geoLocationService = require("../services/geolocation-service");
const studentService = require("../services/student-service");
const request = require("request");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));
const repoArray = require(config.repoArray);
const store = require("../store/store.js");
const actions = require("../store/actions");

module.exports = {
    process(){
        let positionArray = [];
        
        repoArray.map(owner=>{
                this.latestCommits(owner.username,owner.repos)
                .then((commitInfo)=>{
                    Promise.all(commitInfo.map((item)=>{
                        return new Promise((resolve, reject)=>{
                            studentService.find_by_username(item.committer.login)
                         .then((student) =>{
                        geoLocationService.getPosition(student.city).then((position)=>{
                          resolve({lng: position.lng,
                                                lat: position.lat,
                                                time: Date.parse(item.commit.author.date)});
                        })
                    })
                    })
            })).then((positionArray)=>{
        store.dispatch(actions.addLatestCommits(positionArray));

            });           
        });
        });
        //har en idé om hur vi ska lösa denna bättre
        //för varje student i repoarray så sätter
        //vi lat och long
        //sedan hämtar man alla commits för repot
        //hämtar tiden och lägger alla commitstider i en array
        // return Promise.all(repoArray.map(owner =>{
        //     return new Promise((resolve, reject) =>{
        //             this.latestCommits(owner.username, owner.repos)
        //             .then((commitInfo)=>{
                        
                        
        //               commitInfo.map((item) =>{
        //                     studentService.find_by_username(item.committer.login)
        //                     .then((student) =>{
        //                         //console.log(student); denna fungerar
        //                         geoLocationService.getPosition(student.city) //PROBLEMET LIGGER HÄR
        //                             .then((position) =>{
        //                                 positionArray.push({   lng: position.lng,
        //                                         lat: position.lat,
        //                                         time: Date.parse(item.commit.author.date)});
                                        
        //                             }) //getPosition
        //                     }).then(()=>{
        //                                 console.log(positionArray);
        //                             }); //findbyusername
        //                 }))
                        
        //             });//latestcommit
                
        //     });//second promise
        
        // })); //first promise
    },


    latestCommits(owner, repo){
        return new Promise((resolve, reject) =>{
          request({
              url: config.github + owner + '/' + repo + '/commits' + config.numberOfCommits,
              method: 'GET', 
              headers: {
                  "User-Agent": "rk222ev@student.lnu.se"
              }
          }, function(error, response, body){
              if(error) {
                  reject(error);
              } else {
                  //console.log(body); den här loggar body
                  resolve(JSON.parse(body));//verkar inte skicka det här tillbaka till 
              }
          });
        });
    },
};