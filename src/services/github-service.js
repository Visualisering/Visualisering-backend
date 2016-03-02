const request = require("request");

module.exports  = {

  // Requests the latest Github commits from a repo
  //
  // Returns an array of commits
  //
  // Parameters:
  //  owner: string with organisation or github user
  //  repo: string with the repository name
  //
  // Example data:
  //
  //   [ { name: 'Sonny',
  //       email: 'sk222sw@student.lnu.se',
  //       date: '2016-02-18T21:28:33Z' },
  //     { name: 'Mattias',
  //       email: 'mw222rs@student.lnu.se',
  //       date: '2016-02-18T08:53:22Z' } ]
latestCommits: (owner, repo) => {
    const options = {
      headers: {
        "User-Agent": "rk222ev@student.lnu.se"
      },
      url: `https://api.github.com/repos/${owner}/${repo}/commits`
    };
    return new Promise((resolve, reject) => {
      request.get(options, (err, res) => {
        err ? reject(err)
            : resolve(JSON.parse(res.body).map(commit => commit.commit.committer));
      });
    });
  }
};
