"use strict";

const   geoLocationService = require('../services/geolocation-service'),
        studentService = require('../services/student-service'),
        cacheService = require('../services/cache-service'),
        store = require('../store/store.js'),
        actions = require('../store/actions');
        
/*==============================================================================
This module processes data from github getrequest.
commitInfo = array of commits from a certain repo.
Looks up committer in datasets/student.json and returns a student object
Sends student city to openstreetmap and returns latitude and longitude
Resolves an array with positions that is dispatched to statetree and sent to 
sphere client through websockets.
==============================================================================*/

module.exports = {
    process(commitInfo){
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
                            resolve(positions);
                        });
                    });
                });
        })) //dispatches array with positions when Promise.all is fulfilled
        .then((positionArray) => {
            cacheService.cachePositions(positionArray)
            .then(() =>{
                cacheService.getCachedPositions()
                .then((positions) =>{
                    store.dispatch(actions.addLatestPositions(positions));
                });
            });
        });
    },
};