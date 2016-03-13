## Node with redux data store

Backend server is running at [http://iviz-back.herokuapp.com] (http://iviz-back.herokuapp.com)

Start server

```shell
$ npm start
```

Connect to websocket

```shell
$ wscat -c ws://localhost:5000
```

###General information
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
This repository contains a backend api that serves data from github commits to clients. 
Application is written in javascript and runs on a node server. It's open source so if 
you feel like adding components and functionality to this application head over here:
<a>https://github.com/Visualisering/Visualisering/wiki/Adding-a-new-datasource</a>

###Application as it stands
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
There are two ways that server retrieves data from github</br>
1. With a get request to github with information on which repos server wishes to get commit info from.<br>
2. With an active github webhook that POST commit information to application endpoint /commit when a push is
made to an organization repo.

####Startup

####Github webhook

####Data files
