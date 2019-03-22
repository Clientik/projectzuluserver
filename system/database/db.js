const { Pool, Client } = require('pg');
var settings=require("../settings.js");
var console = require("../console.js");
const client = new Client(settings.dbconfig);
module.exports.connections = function(){
client.connect(function(err,done){
           if(err){
           	console.err("Соединение с базой данных");
           	console.result(err);
           }else{
            console.ok("Соединение с базой данных");
           }
	});
}