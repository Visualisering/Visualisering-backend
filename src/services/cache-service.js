'use strict';
const   positions = require("../../src/cache/positions.json"),
        commits = require("../../src/cache/commits.json"),
        fs = require('fs');

module.exports = {
    cachePositions(positionsArray){
        let newPositionsArray = positions;
        return new Promise((resolve, reject) =>{
            Promise.all(positionsArray.map((position) => {
                newPositionsArray.push(position);
            }))
            .then(() =>{
                fs.writeFile("./src/cache/positions.json", JSON.stringify(newPositionsArray, null, 4), (error) => {
                    if(error) {
                        reject("Error when caching positions: " + error);
                    }
                    resolve();
                }); 
            });
        });
    },
    
    getCachedPositions(){
        return new Promise((resolve, reject) =>{
            resolve(positions);
        });
    },
    
    cacheCommits(commitsArray){
        let newCommitsArray = commits;
        return new Promise((resolve, reject) =>{
            Promise.all(commitsArray.map((commit) => {
                newCommitsArray.push(commit);
            }))
            .then(() =>{
                fs.writeFile("./src/cache/commits.json", JSON.stringify(newCommitsArray, null, 4), (error) => {
                    if(error) {
                        reject("Error when caching commits: " + error);
                    }
                    resolve();
                }); 
            });
        });
    },
    
    getCachedCommits(){
        return new Promise((resolve, reject) =>{
            if(commits === null || commits === undefined){
                reject("Cached commits file is empty no startupdata available");
            }
            resolve(commits);
        });
    }
};
