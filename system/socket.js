var settings = require("./settings.js");
var gpapi = require("./googleapi.js");
var console = require("./console.js");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  pingInterval: 1000,
  pingTimeout: 5000
});
module.exports.socketstart = function() {
  server.listen(settings.socketport, function(error) {
    console.ok("Запуск сокета");
  });
};
server.on("error", e => {
  if (e.code === "EADDRINUSE") {
    console.errreason("Запуск сокета", "АДРЕС УЖЕ ИСПОЛЬЗУЕТСЯ");
  } else {
    console.errreason("Запуск сокета", e.code);
  }
});
// middleware
var userId = 0;
io.use((socket, next) => {
  //console.log(socket.id);
  if (socket.handshake.query.authcode !== undefined && socket.handshake.query.authcode !== null) {
    let token = socket.handshake.query.authcode;
    gpapi.getAuthUrl(token).then(
      response => {
        console.massive("ПОЛУЧЕН ТОКЕН АВТОРИЗАЦИИ", response);
        console.scob("КЛИЕНТ ПРОШЕЛ АВТОРИЗАЦИЮ", socket.id);
        next();
      },
      error => {
        console.log(error);
        console.errreason("[" + socket.id + "] НЕ ПРОШЕЛ АВТОРИЗАЦИЮ", error);
        socket.emit("faill", "123");
        socket.disconnect(true);
        //  next(new Error('not authorized'));
      }
    );
  }
});
//ТУТИ НИЧЕГО НЕ ПИСАТЬ МЕЖДУ ЭТИМИ МОДУЛЯМИ
io.on("connection", function(socket) {
  socket.userId = userId++;
  console.scob(
    "ПОЛЬЗОВАТЕЛЬ ПРИСОЕДИНИЛСЯ",
    "id" + socket.userId + ":" + socket.id
  );
  console.massive("ДАННЫЕ ЗАПРОСА", socket.handshake);
  socket.on("chat", function(msg) {
    console.scobtwo("MESSAGE", socket.userId, msg);
    var resuest = msg + " " + "УСПЕШНО";
    socket.emit("requests", "resuest");
  });
  socket.on("disconnecting", reason => {
    console.scobtwo("ОТКЛЮЧЕНИЕ КЛИЕНТА", socket.id, reason);
  });
});
