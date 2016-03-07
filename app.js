"use strict";
const WebSocketServer = require("ws").Server;
const httpServer = require("./src/lib/http-server");
const actions = require("./src/store/actions");
const store = require("./src/store/store");
const commitData = require("./src/services/github-service");

//Godmorgon brudar! Nu har jag fixat sa att data gar fran get-request till websocketen via redux. Nagra saker ar kvar att fixa:
//1. det ar inte sakert att github-service.js behovs. Den skulle kunna plockas bort.
//2. Vi behover pa nagot vis begransa hur manga commits som dispatchas. Jag tror att vi skulle kunna gora det i sphere-getrequest.js rad 48.
//3. Vi behover en schedule som hamtar data en gang per dygn eller vad som nu behovs. Tror det kan goras har i app.js rad 17?
//4. Allmant städ. Det har med att skriva kod snyggt har jag inte riktigt lart mig...
//5. Lagga in Falsterbo manuellt i cities.json

const server = httpServer.init();
const wss = new WebSocketServer({server});

// Hookup datastore and processors
commitData.initDataFetching()

store.subscribe(
  () => {
    if (store.getState()) {
      const data = store.getState();
      const action = JSON.stringify({type: "BACKEND_DATA", data});
      console.log(action);
      wss.broadcast(action);
    }
  }
);

wss.broadcast = data => wss.clients.forEach(client => client.send(data));

wss.on("connection", ws => {
  const data = store.getState();
  const action = JSON.stringify({type: "BACKEND_DATA", data});
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
