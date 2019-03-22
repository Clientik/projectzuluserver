const { google } = require("googleapis");
var settings = require("./settings.js");
const https = require("https");
const userInfoUrl = "https://www.googleapis.com/games/v1/players/me";
const oauth2Client = new google.auth.OAuth2(
  settings.gpapi.id,
  settings.gpapi.secret
);
const scopes = [userInfoUrl];
const url = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes
});
module.exports.getAuthUrl = function(code) {
  return new Promise(function(resolve, reject) {
    oauth2Client.getToken(code, function(err, tokens) {
      if (!err) {
        getInfo(tokens.access_token).then(
          response => {
            var dataplayer = {
              response: response.playerId,
              token: tokens.access_token,
              status: "true"
            };
            resolve(dataplayer);
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject("Ошибка сервисов");
      }
    });
  });
};
function getInfo(token) {
  return new Promise(function(resolve, reject) {
    https
      .get(userInfoUrl + "?access_token=" + token, res => {
        res.on("data", d => {
          userData = JSON.parse(d);
          resolve(userData);
        });
      })
      .on("error", e => {
        console.error(e);
        reject("Ошибка запроса получения информации");
      });
  });
}
