"use strict";
const request = require("request");
const sphere = require("../data-processors/sphere");
const store = require("../store/store.js");
const actions = require("../store/actions");

module.exports = {
  process(githubPush){
    console.log('process');
    let payload = JSON.parse(githubPush); 
        sphere.process(payload.commits)
        .then(function(positionArray){
      console.log(positionArray);
      store.dispatch(actions.addLatestPositions(positionArray));
     });
        
        
    //plocka ut reponame, filename, repoowner, committers ==> matrix
  }
}

// function getCommit(commit){
//     return new Promise.all((resolve, reject) =>{
//         commit.commits.forEach((commitObj)=>{
        
//     });
//     });
    
// };

// function getBlobs(commit){
//     return new Promise((resolve, reject) => {
//         let org = commit.repository.full_name;
//         let sha = commit.after;
//         const options = {
//           headers: {
//             "Accept": "application/vnd.github-blob.raw"
//           },
//           url: "https://api.github.com/repos/" + org + '/git/trees/' + sha
//         };
//           request.get(options, (err, res) => {
//             err ? reject(err)
//                 : resolve(JSON.parse(res.body).map(commit => commit.commit.committer));
//                 //ska returnera array med all blobs
//                 //filnamn och kod
//           });
//     });
// };

// module.exports = {
//     //tar emot ett json objekt med commit från /commit
//     //vid ping från github
//   getCommitInfo(commit) {
    
//     }
// };