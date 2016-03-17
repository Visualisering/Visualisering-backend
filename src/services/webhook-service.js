"use strict";
const sphere = require("../data-processors/sphere-webhook"),
      matrix = require("../data-processors/matrix-webhook");

/*==============================================================================
When push is made to an organization on github with an active webhook Github
sends a post with JSON data to lib/http-server endpoint /commit. That JSON data
is forwarded here and passed on to sphere and matrix data-processors.
==============================================================================*/
module.exports = {
  process(githubPush) {
    sphere.process(githubPush.commits);
    matrix.process(githubPush);
  }
};