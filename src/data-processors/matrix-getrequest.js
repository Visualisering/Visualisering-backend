"use strict";
const geoLocationService = require("../services/geolocation-service"),
    studentService = require("../services/student-service"),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./config.json')),
    repoArray = require(config.repoArray),
    store = require("../store/store.js"),
    actions = require("../store/actions"),
    request = require("request"),
    _ = require("lodash");

module.exports = {
    process() {
            //Welcome to the big Promise-party!
            //first Promise.all iterates through repoarray
            Promise.all(repoArray.map(owner => {
                return new Promise((resolve, reject) => {
                    this.latestCommits(owner.username, owner.repos)
                        .then((commitInfo) => {
                            //second Promise.all iterates through commitarray from github
                            Promise.all(commitInfo.map((item) => {
                                return new Promise((resolve, reject) => {
                                    resolve({
                                        repo: owner.repos,
                                        owner: owner.username,
                                        timestamp: item.commit.committer.date,
                                        message: item.commit.message,
                                        committer: item.committer.login,
                                        filename: "fil.js", //default filnamn
                                        code: config.defaultCode
                                    });
                                });
                            })).then((commits) => {
                                resolve(commits);
                            });
                        });
                });
            })).then((commitArrays) => {
                this.dispatchToMatrix(commitArrays);
            });
        },
        dispatchToMatrix(commitArrays) {
            let commitArray = [];
            commitArrays.map(commits => {
                commits.map(commitObject => {
                    commitArray.push(commitObject);
                });
            });
            let commitsToDispatch = _.orderBy(commitArray, ['time'], ['desc']).splice(-100);
            store.dispatch(actions.addLatestCommits(commitsToDispatch));
        },
        latestCommits(owner, repo) {
            return new Promise((resolve, reject) => {
                request({
                    url: config.github + owner + '/' + repo + '/commits' + config.numberOfCommits,
                    method: 'GET',
                    headers: {
                        "User-Agent": "rk222ev@student.lnu.se"
                    }
                }, function(error, response, body) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    }
                    else {
                        //  console.log(body); //den här loggar body
                        resolve(JSON.parse(body)); //verkar inte skicka det här tillbaka till 
                    }
                });
            });
        },
};