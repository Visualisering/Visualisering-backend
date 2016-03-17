###General information
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
This repository contains a backend api that serves data from github commits to clients. 
Application is written in javascript and runs on a node server. It's open source so if 
you feel like adding components and functionality to this application head over here:
<a>https://github.com/Visualisering/Visualisering/wiki/Adding-a-new-datasource</a>

Backend server is running at [http://iviz-back.herokuapp.com] (http://iviz-back.herokuapp.com). Go there for more detailed instructions on how to connect to the websocket-server.

###Configure your own backend server
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
There are two ways that server retrieves data from github</br>
1. With a get request to github with information on which repos server wishes to get commit info from.<br>
2. With an active github webhook that POST commit information to application endpoint /commit when a push is
made to an organization repo.

New data is processed and saved together with previous existing data and will send the data to clients connected to the websocket, either on request from the client or when the state changes.
 The data is in JSON-format and contain information about:
 <ul>
        <li>"positions": Gives an array with objects containing latitude, longitude (retrieved from OpenStreetMap) and a unix timestamp for commits made in the repos defined in the application, updated everyday at 23 CET.</li>
        <li>"commits": Gives an array with objects containing reponame, owner of repo, timestamp, message, committer, filename and code from the changes made in the commit(base64-encoded) for commits made in the repos defined in the application, updated everyday at 23 CET.</li>
    </ul>

If you want to configure your own backend server, make sure you have Node.js installed, clone this repo and follow the instructions below:
####Startup
First time:
```shell
$ npm install
``` 
to install libraries used in the application.

Start server:

```shell
$ npm start
```

Tests:

```shell
$ npm test
```

Connect to websocket:

```shell
$ wscat -c ws://localhost:5000
```
###Add repos to watch
In datasets/repos.json, add the repos you want to watch:
```
[
    {
        "username":"username of repoowners",
        "repos":"reponame"
    },
    {
        "username":"another repoowner",
        "repos":"another repo"
    }
]
```
This will request data from github server start and on a schedule event everyday at 23 CET. You can change scheduled time in settings.js

To get hold of the positions, make sure to add information about the user (city and github-username) in ```students.json```. Please make sure to add a github-authorization-token as an environment-variable, add the name of the variable in settings.js and uncomment this information in getcommits-service.js to
avoid limitations in number of requests that is possible to make to github. Also, add email-address to correct userAgent in settings.js

####Github webhook
The application will update the state-tree with information in real-time if you add a webhook to a repo with the address to your own deployment and the endpoint ```/commit```. For more information about github-webhooks, please look [here](https://developer.github.com/webhooks/).

####Settings
In settings.js, you can change number of commits retrieved from each repo, and defaultCity, defaultLongitude and defaultLatitude to use if no location is found and and defaultCode if github-commit-code is undefined.

