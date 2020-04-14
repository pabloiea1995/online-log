module.exports = (app) => {
  var express = require('express');
  //var bodyParser = require('body-parser');
  var logger = require("./lib/logger")
  //var app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  var path = require('path');


  //logger.initialiceLogger({memory_lines_length:10});
  logger.initialiceLogger();

  var indexRouter = require('./lib/routes');
  app.use('/online-log', indexRouter);
  app.use(express.static(path.join(__dirname, '/view/')));
  /*for( i = 0; i < 15; i++){
  
      logger.log("ERROR", `testlog ${i}`);
      
  }
  logger.log("ERROR", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("WARN", `.`);
  logger.log("INFO", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("TRACE", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("DEBUG", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("TRACE", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("WARN", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("FATAL", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("INFO", `same text.`);
  logger.log("INFO", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("ERROR", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  logger.log("WARN", `same text.`);
  logger.log("DEBUG", `testlog Lorem Ipsum is simply dummy text of the printing and typesetting industry.`);
  */


  // app.listen(logger.port, function () {
  //   console.log(`Log server runnnig on port ${logger.port}`);
  // });

  // module.exports = app;

}
module.exports.log = require("./lib/logger").log;