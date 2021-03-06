console.log("Reading librarys...");
const readline=require('readline');
var path = require('path');
const express = require('express');
const app = express();
const rl=readline.createInterface({
	input:process.stdin,
	output:process.stdout
});
const fs = require('fs');
var logger = require('morgan');
var silent = process.env.NODE_ENV === 'test'
//require('./src/twapi.js');
const Packager = require('@turbowarp/packager');
//const fs = require('fs');
const packager = new Packager.Packager();
async function pkgr(fdt,name){
    const projectData=fdt;
    const progressCallback = (type, a, b) => {};
    const loadedProject = await Packager.loadProject(projectData, progressCallback);
    const packager = new Packager.Packager();
    packager.project = loadedProject;
    packager.options.app.windowTitle=name;
    const resultee = await packager.package();
    return resultee.data;
}
// general config
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.enable('verbose errors');
console.log("Reading config...");
const config = require('./config.json');
const port = config.port;

console.log("Loading sites...");
const sites= require('./sites.json');
app.get('/', (req, res) => {
  res.send('<center><h1>Weblocks</h1><HR/><b>Hello World!</b><br/>Another weblocks server. <i><a href="https://github.com/HydroGest/Weblocks">GitHub</a></i> </center>')
});
for (var i=1;i<=sites.length;i++){
    try{
        var projectData = fs.readFileSync(config.projectsIndex+'/'+sites[i-1].projectFile);
        data=pkgr(projectData,sites[i-1].name);
        app.get(sites[i-1].viewPath, (req, res) => {
            res.send(data)
        });
        console.log('Site: '+sites[i-1].name+' load successfully.')
    }catch(err){
        console.error("Failed to load file `"+config.projectsIndex+"/"+sites[i-1].projectFile+"` !");
        console.error(err);
    }
}

app.get('/404', function(req, res, next){
  next();
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.get('/403', function(req, res, next){
  var err = new Error('403 Forbidden');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  next(new Error('Sorry, coffee spilled on the server.'));
});

app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.send("<!DOCTYPE HTML><html<head><title>404 Not Found</title></head><body><center><h1>404 Not Found</h1><HR /><p>Weblocks</p></center></body></html>")
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
});

try{
app.listen(port, () => {
    console.log(`Your app '`+config.appName+`' listening on port ${port}`);
});
}catch(err){
    console.log("Err: Failed to start server!");
    process.exit(1);
}


