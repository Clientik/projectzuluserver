const fs = require("fs");
module.exports.dbconfig = {
  user: "ziro",
  host: "80.250.183.237",
  database: "zulu",
  password: "",
  port: 5432
};
module.exports.socketport = 3000; //Порт сокетов
//module.exports.ssl = {
//  key: fs.readFileSync('./system/file.pem') ,
//  cert: fs.readFileSync('./system/file.crt')
//};
module.exports.gpapi = {
  id: "",
  secret: ""
};
