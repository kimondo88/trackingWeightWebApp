const jsonServer = require("json-server");
const express = require("express");
const path = require("path");
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use("/src", express.static(__dirname + "/src/"));
server.use("/dist", express.static(__dirname + "/dist/"));

server.use("/home", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

// server.use("/users", (req, res) =>
//   res.sendFile(path.join(__dirname + "/data/db.json"))
// );

server.use(router);
const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
}); 