"use strict";
const   studentService = require('../services/student-service'),
        geoLocationService = require('../services/geolocation-service'),
        cacheService = require('../services/cache-service');
        
/*==============================================================================
This module processes data from github webhook.
commitInfo = array of commits from a certain repo.
Looks up committer in datasets/student.json and returns a student object
Sends student city to openstreetmap and returns latitude and longitude
Resolves an array with positions that is cached to cache/positions.json
==============================================================================*/

module.exports = {
    process(commitInfo) {
        return Promise.all(commitInfo.map(commit => {
            return new Promise((resolve, reject) => {
                studentService.find_by_username(commit.author.username)
                    .then((student) => {
                        geoLocationService.getPosition(student.city)
                            .then((position) => {
                                resolve({
                                    lng: position.lng,
                                    lat: position.lat,
                                    time: Date.parse(commit.timestamp)
                                });
                            });
                    });
                });
        }))//When Promise.all on line 16 is fulfilled cache positions to file
        .then((positionsArray) => {
            cacheService.cachePositions(positionsArray);
        });
    }
};