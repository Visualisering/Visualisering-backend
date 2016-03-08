"use strict";
const WebSocketServer = require("ws").Server,
      httpServer = require("./src/lib/http-server"),
      store = require("./src/store/store"),
      commitData = require("./src/data-processors/sphere-getrequest"),
      schedule = require('node-schedule');


const server = httpServer.init();
const wss = new WebSocketServer({server});

//Start-up data
//==============================================================================
//Get startup-data for sphere and matrix module
commitData.process();
let checkDate = new Date();

//Update commits from github repos defined in datasets/repos.json
//every day 23.00 every day
schedule.scheduleJob('/00 00 22 * * 1-7', function(){
  console.log("schedule at 23 every day" + checkDate.getDate());
  commitData.process();
});
//==============================================================================

store.subscribe(
  () => {
    if (store.getState()) {
      const data = store.getState();
      console.log(data);
      const action = JSON.stringify({type: "BACKEND_DATA", data});
      wss.broadcast(action);
    }
  }
);

wss.broadcast = data => wss.clients.forEach(client => client.send(data));

wss.on("connection", ws => {
  const action = JSON.stringify({type: "WS_CONNECTED"});
  ws.send(action);

  ws.on("message", message => {
    try { // Using a try-catch because JSON.parse explodes on invlaid JSON.
      const action = JSON.parse(message);
      console.log("Received action from client:");
      console.log(action);
      store.dispatch(action);
    } catch (e) {
      console.error(e.message);
      ws.send("Unable to parse JSON string.");
    }
  });
});