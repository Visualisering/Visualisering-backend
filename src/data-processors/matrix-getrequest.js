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
    process(commitInfo, owner, commitFiles) {
        Promise.all(commitInfo.map((item) => {
            let code = "";
            let fileName = "";
            Promise.all(commitFiles.map((file) => {
                code += file.patch;
                fileName = file.filename;
            })).then(() => {
                return new Promise((resolve, reject) => {
                    resolve({
                        repo: owner.repos,
                        owner: owner.username,
                        timestamp: item.commit.committer.date,
                        message: item.commit.message,
                        committer: item.committer.login,
                        filename: fileName,
                        code: new Buffer(code).toString('base64')
                    });
                }).then((commitsWithCode) => {
                    store.dispatch(actions.addLatestCommits(commitsWithCode));
                });
            });
        }));
    }
};