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
                        console.log(position);
                        resolve({   lng: position.lng,
                                    lat: position.lat,
                                    time: commit.timestamp })});
                });
            });
        }));
    }      
};   
    
    
    
    
    
    
   /* process(commits){
            return Promise.all(commits.forEach((commit)=>{
            let sphereData = [];
                let newCommit = {
                    timestamp: commit.timestamp,
                    lat: undefined,
                    lng: undefined
                };
                studentService.find_by_username(commit.author.username)
                .then(function(student){
                    geoLocationService.getPosition(student.city)
                        .then(function(position){
                            newCommit.lat = position.lat;
                            newCommit.lng = position.lng;
                            sphereData.push(newCommit);
                    });
                });

        })).then(sphereData=>store.dispatch(actions.addLatestPositions(resolve(sphereData))));
    }
}*/
    

//                     webhookService.getCommitInfo(githubPush)
//                         .then(function(student){
//                             console.log(student);
//                         //här kommer info om blobs och committers
//                         }); 
//                 })
//                 .catch(function(err) {
//                 console.log("Failed:", err);
//                 });              
//         });
//     }
// };

<<<<<<< HEAD
 /* dataSet() {
    return new Promise((resolve, reject) => {
      githubService.getBlobs()
                  .then(process)
                  .then(resolve)
                  .catch();
    });
  }*/
=======
//  /* dataSet() {
//     return new Promise((resolve, reject) => {
//       githubService.getBlobs()
//                   .then(process)
//                   .then(resolve)
//                   .catch();
//     });
//   }*/
>>>>>>> dispatching spheredata
