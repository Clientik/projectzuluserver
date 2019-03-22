var settings=require("./system/settings.js");
var db= require("./system/database/db.js");
var socketio= require("./system/socket.js");
db.connections();
socketio.socketstart();