var express = require('express');
var bodyParser = require('body-parser');
var logger = require("./lib/logger")
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var path = require('path');


logger.initialiceLogger({memory_lines_length:10});
//logger.initialiceLogger();

var indexRouter = require('./lib/routes');
app.use('/online-log', indexRouter);
app.use(express.static(path.join(__dirname, '/view/')));
for( i = 0; i < 15; i++){

    logger.log("ALL", `testlog ${i}`);
    
}

app.listen(3001, function () {
    console.log('app listening on port 3001!');
  });

module.exports = app;
