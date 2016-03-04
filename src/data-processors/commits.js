"use strict";
const studentService = require("../services/student-service");
const geoLocationService = require("../services/geolocation-service");

module.exports = {
    process(commits) {
        return Promise.all(commits.map(commit => {
            return new Promise((resolve, reject) => {
                studentService.find_by_username(commit.author.username)
                    .then((student) =>{
                        geoLocationService.getPosition(student.city)
                            .then((position) => {
                                resolve({   lng: position.lng,
                                            lat: position.lat,
                                            time: Date.parse(commit.timestamp)});
                    });
                });
            });
        }));
    }
};
