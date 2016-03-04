const githubService = require("../services/commit-service");
const studentService = require("../services/committer-service");

const process = commits => {
  return Promise.all(commits.map(commit => {
    return new Promise((resolve, reject) => {
      const username = commit.email.split("@")[0];
      studentService.find_by_username(username)
                    .then(student => resolve({lng: student.lng,
                                              lat: student.lat,
                                              time: Date.parse(commit.date)}));
    });
  }));
};

module.exports = {

  dataSet() {
    return new Promise((resolve, reject) => {
      githubService.latestCommits("Visualisering", "Visualisering-frontend")
                  .then(process)
                  .then(resolve);
    });
  }

};
