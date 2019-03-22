const colors = require("colors/safe"); //Цветной текст
const log4js = require('log4js'); //Модуль логирования
var myDate = new Date(); //Узнаем дату
var date = ((myDate.getMonth() + 1) + "." + myDate.getDate() + "." + myDate.getFullYear()+"("+myDate.getHours() + "." + myDate.getMinutes() + "." + myDate.getSeconds()+")"); //Формируем название для файла лога
var name =  './system/LOGS/'+date+'.log'; //Формируем название для файла лога
log4js.configure({        //Конфигурация для логирования
  appenders: { cheese: { type: 'file', filename: name } },
  categories: { default: { appenders: ['cheese'], level: 'debug' } }
});
const logger = log4js.getLogger('ZIRO'); //Название в файле  вместо cheese  будет писать рядом с текстом ZIRO
//***************************
//        ФУНКЦИИ
//***************************
module.exports.log = function(msg){
console.log(msg);
logger.info(msg);
}
module.exports.ok = function(msg){
console.log (colors.cyan.bold(msg+"[")+colors.green.bold("*OK*")+colors.cyan.bold("]"));
logger.info(msg+"["+"*OK*"+"]");
}
module.exports.err = function(msg){
console.log (colors.cyan.bold(msg+"[")+colors.red.bold("*ERROR*")+colors.cyan.bold("]"));
logger.info(msg+"["+"*ERROR*"+"]");
}
module.exports.errreason = function(msg,reason){
console.log (colors.cyan.bold(msg+"[")+colors.red.bold("*ERROR*")+colors.cyan.bold("]"));
console.log (colors.cyan.bold("ПРИЧИНА:\n")+colors.red.bold(reason));
logger.info(msg+"["+"*ERROR*"+"]");
logger.info("ПРИЧИНА:\n"+reason);
}
module.exports.result = function(msg){
console.log (colors.red.bold(msg));
logger.info(msg);
}
module.exports.scob = function(msg,scob){
console.log (colors.yellow.bold(msg+"[")+colors.cyan.bold(scob)+colors.yellow.bold("]"));
logger.info(msg+"["+scob+"]");
}
module.exports.scobtwo = function(msg,scob1,scob2){
console.log (colors.yellow.bold(msg+"[")+colors.cyan.bold(scob1)+colors.yellow.bold("]"+"[")+colors.cyan.bold(scob2)+colors.yellow.bold("]"));
logger.info(msg+"["+scob1+"]"+"["+scob2+"]");
}
module.exports.massive = function(msg,mass){
console.log (colors.yellow.bold(msg+"[\n")+colors.green.bold(mass)+colors.yellow.bold("\n]"));
logger.info(msg+"["+mass+"]");
}
//logger.trace('Entering cheese testing');
//logger.debug('Got cheese.');
//logger.info('Cheese is Comté.');
//logger.warn('Cheese is quite smelly.');
//logger.error('Cheese is too ripe!');
//logger.fatal('Cheese was breeding ground for listeria.');