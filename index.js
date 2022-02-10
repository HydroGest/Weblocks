console.log("Reading librarys...");
const express = require('express');
const app = express();
console.log("Reading config...");
const config = require('./config.json');
const port = config.port;
const siteList = require(config.siteIndex);
console.log("Loading sites list...");

app.get('/', (req, res) => {
  res.send('<center><h1>Weblocks</h1><HR/><b>Hello World!</b><br/>Another weblocks server. <i><a href="https://github.com/HydroGest/Weblocks">GitHub</a></i> </center>')
});

app.listen(port, () => {
  console.log(`Your app '`+config.appName+`' listening on port ${port}`);
});