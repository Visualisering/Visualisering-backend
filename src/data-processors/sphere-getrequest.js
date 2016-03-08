"use strict";

const geoLocationService = require("../services/geolocation-service"),
    studentService = require("../services/student-service"),
    request = require("request"),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./config.json')),
    repoArray = require(config.repoArray),
    store = require("../store/store.js"),
    actions = require("../store/actions"),
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
                                    studentService.find_by_username(item.committer.login)
                                        .then((student) => {
                                            geoLocationService.getPosition(student.city).then((position) => {
                                                resolve({
                                                    lng: position.lng,
                                                    lat: position.lat,
                                                    time: Date.parse(item.commit.author.date)
                                                });
                                            })
                                        });
                                });
                            })).then((positions) => {
                                //here we ship all positions when promise.all on line 15 i fullfilled
                                resolve(positions);
                            });
                        });
                });
            })).then((positionArrays) => {
                this.dispatchToSphere(positionArrays);
            });
        },

        dispatchToSphere(positionArrays) {
            let positionArray = [];
            positionArrays.map(positions => {
                positions.map(positionObject => {
                    positionArray.push(positionObject);
                });
            });
            let positionsToDispatch = _.orderBy(positionArray, ['time'], ['desc']).splice(-100);
            store.dispatch(actions.addLatestPositions(positionsToDispatch));
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
                        //console.log(body); //den här loggar body
                        resolve(JSON.parse(body)); //verkar inte skicka det här tillbaka till 
                    }
                });
            });
        },
};