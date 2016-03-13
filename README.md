## Node with redux data store

Start server

```shell
$ npm start
```

Connect to websocket

```shell
$ wscat -c ws://localhost:5000
```
```shell
**General information**
-------------------
This repository contains a backend api that serves data from github commits to clients. 
Application is written in javascript and runs on a node server. It's open source so if 
you feel like adding components and functionality to this application head over here:
https://github.com/Visualisering/Visualisering/wiki/Adding-a-new-datasource


```
Startup
When server starts up, inital data is loaded from app.js
by calling method process() from sphere-getrequest-file.
Method asks github for commits made to repos defined in datasets/repos.json
This initialization only occurs once and dispatches startup-data to
both sphere and matrix module.

** Startup-data **

** Github webhook **
Add a webhook to any organisation. Webhook should receive a post
from github when a push is made to any repo in the organization.
Endpoint should be: [your url to application]/commit
Post from github enters in file lib/http-server where method process() is called.
Process() that deals with webhook data is located in services/webhook-service.js.
When processed, data is dispatched to sphere and matrix modules.
