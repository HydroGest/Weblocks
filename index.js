console.log("Reading librarys...");
const readline=require('readline');
const express = require('express');
const app = express();
const rl=readline.createInterface({
	input:process.stdin,
	output:process.stdout
})
console.log("Reading config...");
const config = require('./config.json');
const port = config.port;

//const siteList = require(config.siteIndex);

app.get('/', (req, res) => {
  res.send('<center><h1>Weblocks</h1><HR/><b>Hello World!</b><br/>Another weblocks server. <i><a href="https://github.com/HydroGest/Weblocks">GitHub</a></i> </center>')
});

app.listen(port, () => {
    console.log(`Your app '`+config.appName+`' listening on port ${port}`);
    console.log('Type`stop` to stop.');
    while(1){
        rl.question('> ',function(ans){
            if(ans=='stop'){
                process.exit(0);
            }
            rl.close();
        });
    }
});