"use strict";

// Dependencies ================================================================

const WebSocketServer = require('ws').Server,
      httpServer = require('./src/lib/http-server'),
      store = require('./src/store/store'),
      githubRequestService = require('./src/services/githubrequest-service'),
      schedule = require('node-schedule'),
      server = httpServer.init(),
      wss = new WebSocketServer({server}),
      settings = require('./settings.js');

// Start-up data ===============================================================
// Get startup-data for sphere and matrix module
githubRequestService.process();

/*==============================================================================
Updates commits from github-repos defined in datasets/repos.json 23.00 every day.
You can change the time in settings.js.
If you choose to use webhooks this is not neccessary since you will get
all commits in realtime instead.
==============================================================================*/
//schedule.scheduleJob(settings.timeToUpdate, function() {
//  githubRequestService.process();
//});

// Redux statetree =============================================================
store.subscribe(
  () => {
    const data = store.getState();
    if (data) {
      const action = JSON.stringify({
        type: "BACKEND_DATA",
        data
      });
     console.log(action);
    wss.broadcast(action);
    }
  }
);

// websockets ==================================================================
wss.broadcast = data => wss.clients.forEach(
  client => {
    client.send(data);
  });
  
wss.on("connection", ws => {
  const action = JSON.stringify({
    type: "WS_CONNECTED"
  });
  
  ws.send(action);
  
  ws.on("message", message => {
    try { // Using a try-catch because JSON.parse explodes on invlaid JSON.
      const action = JSON.parse(message);
      console.log("Received action from client:");
      store.dispatch(action);
    }
    catch (e) {
      console.error(e.message);
      ws.send('Unable to parse JSON string.');
    }
  });
});