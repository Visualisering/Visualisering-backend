"use strict";

let settings = {
    //To avoid unnecessay string dependencies
    geoentry: "http://nominatim.openstreetmap.org/search?format=json&city=",
    github: "https://api.github.com/",
    repoArray: "../../datasets/repos.json",
    
    //number of commits per repo wanted from github request
    numberOfCommits: "?page=1&per_page=20",
    
    //userAgent when making requests to Github
    userAgent:"",
    
    //name on environment-variable for Github-auth-token
    GITHUB_TOKEN:"",
    
    //https://github.com/node-schedule/node-schedule
    timeToUpdate: "/00 00 22 * * 1-7",
    
    //default values to fall back on if github username is undefined
    defaultCity: "Kalmar",
    defaultLatitude: "56.666142",
    defaultLongitude: "16.356995",
    
    //default code to fall back on if github commit code is undefined
    defaultCode:  "Y29uc3QgV2ViU29ja2V0U2VydmVyID0gcmVxdWlyZSgid3MiKS5TZXJ2ZXI7\nCmNvbnN0IGh0dHBTZXJ2ZXIgPSByZXF1aXJlKCIuL3NyYy9saWIvaHR0cC1z\nZXJ2ZXIiKTsKY29uc3QgYWN0aW9ucyA9IHJlcXVpcmUoIi4vc3JjL3N0b3Jl\nL2FjdGlvbnMiKTsKY29uc3Qgc3RvcmUgPSByZXF1aXJlKCIuL3NyYy9zdG9y\nZS9zdG9yZSIpOwpjb25zdCBzcGhlcmUgPSByZXF1aXJlKCIuL3NyYy9kYXRh\nLXByb2Nlc3NvcnMvc3BoZXJlIik7Cgpjb25zdCBzZXJ2ZXIgPSBodHRwU2Vy\ndmVyLmluaXQoKTsKY29uc3Qgd3NzID0gbmV3IFdlYlNvY2tldFNlcnZlcih7\nc2VydmVyfSk7CgovLyBIb29rdXAgZGF0YXN0b3JlIGFuZCBwcm9jZXNzb3Jz\nCnNwaGVyZS5kYXRhU2V0KCkKICAudGhlbihjb21taXRzID0+IHN0b3JlLmRp\nc3BhdGNoKGFjdGlvbnMuYWRkTGF0ZXN0Q29tbWl0cyhjb21taXRzKSkpOwoK\nc3RvcmUuc3Vic2NyaWJlKAogICgpID0+IHsKICAgIGlmIChzdG9yZS5nZXRT\ndGF0ZSgpKSB7CiAgICAgIGNvbnN0IGRhdGEgPSBzdG9yZS5nZXRTdGF0ZSgp\nOwogICAgICBjb25zdCBhY3Rpb24gPSBKU09OLnN0cmluZ2lmeSh7dHlwZTog\nIkJBQ0tFTkRfREFUQSIsIGRhdGF9KTsKCiAgICAgIGNvbnNvbGUubG9nKGRh\ndGEpOwoKICAgICAgd3NzLmJyb2FkY2FzdChhY3Rpb24pOwogICAgfQogIH0K\nKTsKCndzcy5icm9hZGNhc3QgPSBkYXRhID0+IHdzcy5jbGllbnRzLmZvckVh\nY2goY2xpZW50ID0+IGNsaWVudC5zZW5kKGRhdGEpKTsKCndzcy5vbigiY29u\nbmVjdGlvbiIsIHdzID0+IHsKICBjb25zdCBhY3Rpb24gPSBKU09OLnN0cmlu\nZ2lmeSh7dHlwZTogIldTX0NPTk5FQ1RFRCJ9KTsKICB3cy5zZW5kKGFjdGlv\nbik7CgogIHdzLm9uKCJtZXNzYWdlIiwgbWVzc2FnZSA9PiB7CiAgICB0cnkg\neyAvLyBVc2luZyBhIHRyeS1jYXRjaCBiZWNhdXNlIEpTT04ucGFyc2UgZXhw\nbG9kZXMgb24gaW52bGFpZCBKU09OLgogICAgICBjb25zdCBhY3Rpb24gPSBK\nU09OLnBhcnNlKG1lc3NhZ2UpOwogICAgICBjb25zb2xlLmxvZygiUmVjZWl2\nZWQgYWN0aW9uIGZyb20gY2xpZW50OiIpOwogICAgICBjb25zb2xlLmxvZyhh\nY3Rpb24pOwogICAgICBzdG9yZS5kaXNwYXRjaChhY3Rpb24pOwogICAgfSBj\nYXRjaCAoZSkgewogICAgICBjb25zb2xlLmVycm9yKGUubWVzc2FnZSk7CiAg\nICAgIHdzLnNlbmQoIlVuYWJsZSB0byBwYXJzZSBKU09OIHN0cmluZy4iKTsK\nICAgIH0KICB9KTsKfSk7Cg==\n",

    //Test settings
    testRepo: "TRAFFICREPORTS_js223kz",
    testOwner: "js223kz",
    testUsername: "js223kz",
    testFile: "/app/public/controllers/mainController.js",
    
    //Redux-settings
    action_add_commits:  "ADD_COMMITS",
    action_add_positions:"ADD_POSITIONS",
    sortCommitsBasedOnTime: 'timestamp',
    sortPositionsBasedOnTime:'time',
    sortDescending:'desc'
};
module.exports = settings;