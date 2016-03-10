"use strict";

const   geoLocationService = require("../services/geolocation-service"),
        studentService = require("../services/student-service"),
        store = require("../store/store.js"),
        actions = require("../store/actions"),
        _ = require("lodash");

/*==============================================================================
This module processes data that will be dispatched to client spheremodule.
It takes commitdata from githubrequest-service as an argument.
Looks up committer in datasets/student.json and returns a student object
Sends student city to openstreetmap and returns latitude and longitude
Resolves an array with positions that is dispatched to statetree and sent to 
client through websockets.
==============================================================================*/

module.exports = {
    process(commitInfo){
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
                        }).then((positions) => {
                        //here we ship all positions when promise.all 
                        //on line 21 i fullfilled
                        resolve(positions);
                        });
                    });
                });
        })).then((positionArrays) => {
        store.dispatch(actions.addLatestPositions(positionArrays));

        });
    }
};