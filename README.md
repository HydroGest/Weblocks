
# Weblocks
A web server for SB3 files.

## Getting Start
### Before Start
This project use Node.js, so you should make sure you have installed Node.js.

### Get Ready
Use your bash or shell.
```bash
npm install
```
Then, npm will install all the package we need.

You should edit the `config.json` to config Weblocks.

```javascript
{
     "appName":"...", //Your app's name.
     "port":80, //The port your app will listen.
     "projectIndex":"./projects" //The path of your sb3 files. Weblocks Will load it.
}
```
### Start!
Run this code on your bash/shell
```bash
npm run server
```
Then, you can try to visit `http://localhost:<your port>`.

## Add Sites
Edit `sites.json` to manage your sites.
```javascript
[
    {
         "name":"Example",// Site name. Show as <title> in HTML 
         "viewPath":"/example", // The path to visit this page.
         "projectFile":"example.sb3" // Your SB3 file name.
    }
]
```
Put your sb3 files in dir `./projects`

## TODO

...


