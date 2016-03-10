"use strict";
const geoLocationService = require("../services/geolocation-service"),
    studentService = require("../services/student-service"),
    fs = require('fs'),
    config = JSON.parse(fs.readFileSync('./config.json')),
    repoArray = require(config.repoArray),
    store = require("../store/store.js"),
    actions = require("../store/actions"),
    request = require("request");
module.exports = {
    process(commitInfo, owner) {
            Promise.all(commitInfo.map((item) => {
                return new Promise((resolve, reject) => {
                    resolve({
                        repo: owner.repos,
                        owner: owner.username,
                        timestamp: item.commit.committer.date,
                        message: item.commit.message,
                        committer: item.committer.login,
                        filename: "fil.js", //default filnamn
                        code: config.defaultCode //default kod
                    });
                });
            })).then((commitArrays) => {
                store.dispatch(actions.addLatestCommits(commitArrays));
            });
        }
};