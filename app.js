const WebSocketServer = require("ws").Server;
const httpServer = require("./src/lib/http-server");
const actions = require("./src/store/actions");
const store = require("./src/store/store");
const sphere = require("./src/data-processors/sphere");

const server = httpServer.init();
const wss = new WebSocketServer({server});

// Hookup datastore and processors
commits.dataSet()
  .then(commits => store.dispatch(actions.addLatestCommits(commits)));

store.subscribe(
  () => {
    if (store.getState()) {
      const data = store.getState();
      const action = JSON.stringify({type: "BACKEND_DATA", data});

      console.log(data);

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
