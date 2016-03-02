"use strict"
const request = require("request");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json'));

module.exports = {
    //tar emot ett json objekt med commit från /commit
    //vid ping från github
  getBlobs(commit) {
    return new Promise((resolve, reject) => {
        let org = commit.repository.full_name;
        let sha = commit.after;
        const options = {
          headers: {
            "Accept": "application/vnd.github-blob.raw"
          },
          url: "https://api.github.com/repos/" + org + '/git/trees/' + sha
        };
          request.get(options, (err, res) => {
            err ? reject(err)
                : resolve(JSON.parse(res.body).map(commit => commit.commit.committer));
                //ska returnera ett commit objekt
                //med username, timestamp, commitmessage, blobs
          });
        });
    }
};


    
