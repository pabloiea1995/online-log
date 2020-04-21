
# online-log

  

![minified size](https://img.shields.io/badge/minified%20size-132%20kB-blue)  ![install size](https://img.shields.io/badge/install%20size-1.74%20MB-blue)  ![online-demo](https://img.shields.io/badge/demo-on--line-orange)  ![version](https://img.shields.io/badge/version-v1.0-green)

  
  Using  vscode? Install our online-log snippets extension on [vscode marketplace](https://marketplace.visualstudio.com/items?itemName=psanchezmvelarde.online-log-snnipets)
   
  

NPM module to generate online log for your express applications. Establishes a new end-point on `/online-log`. Main view is on `/online-log/view`

*Version 0.2.0 Release Notes:*
   

 - Added support for optional console.log printing with a possibility to colour level string.
 - Added log level selection, so entries with lower log level than configured won´t be registered.
 - Minnor improvements on the web view. 
  



 [online-demo](https://autos-la-valenciana.ew.r.appspot.com/online-log/view)
#### Use cases:
This module has been developed as a way to have an easy and accessible entry point to internal production services logs without having to go into production server or inspecting application terminal or log files. This way logging information can be accessed anywhere from any device, such as smartphone or tablets.

By registering and exposing log it could be use on monitoring and alerting processes or with automatization software like Jenkins.

**Important:** This version **does not** support authentication to the web view yet. Be aware of this if you are going to use it on your production environments

## Installation

This module works with express so you will need to have a current express application.

To install just run the command `npm i online-log`

## Features

 - On memory log register defined by log level
 - Each entry defined by a uid
 - Generates an online view with the log registry 
 - Refreshes automatically
 - Filter by log level
 - Define your own log level colors

## Usage

Usage is quite simple. Just initiate the log end-points executting the function `online-log(app)` passing your express app as parameter. Then start writting logs with function `log()`. Example:

  ```javascript
  //Importing express
const express =  require('express');

//Initializing app
const app =  express();

//requiring and initializing online-log
const online_log = require("online-log");
online_log(app);
//asign logging main function
const log = online_log.log;

//Start writting fanzy log
log("DEBUG", "This is a debug log line");
```

### Log levels:
Currently, allowed log levels are:

 - TRACE
 - DEBUG
 - INFO
 - WARN
 - ERROR
 - FATAL

Future versions will allow you to configure custom log levels and its key word on `log()` function.
To reference to a log level on a log entry, introduce the log level keywords (those listed earlier) as first parameter of `log()` function with UPPERCASE. 
```javascript
//This will NOT work
log("trace", "This log will thorw an error")
//This will work
log("TRACE", "This log will work");
```

#### Object and error support

The web view supports the log of objects and error. The modules handles in a special way log message parameter that it detects as Object (JSON) and Error types.

To log an error:
```javascript
	  const online_log =  require("online-log").log; 
	  try{
		  //your code here
	  }
	  catch(error){
		  log("ERROR", error)
		  //your code here
		  
	  } 
```
Error can be displayed with any log level.

To log an object:
```javascript
	  const online_log =  require("online-log").log; 
	 log("DEBUG", {
			 object:  "test", 
			 foo:{
				bar:  "test"
				}
			})
```

### Log registry

Log registry is stored in memory in an object that you can access with property `.logger` of main online-log object. It's made by a series of arrays with the different properties of each log entry, ordered by execution time, being the latest at the end of each list. This way (object of lists) has been tested to be the fastest way to manipulate the object, and also the less memory consuming.

```javascript
logger: {
	dateTime: [],
	level: [],
	process: [],
	content: [],
	uid: [],
 }
```
You can access this object over the end-point `/online-log/`. This could be useful to execute automatic tasks such as reload when error message is shown or email sending.

Log registry is, by default, 1000 entries long. But you can modify that number by configuration.

### Configuration

Configuration of module options is made through option parameter on `online-log()` function.
Currently, available configurations are `styles.levelsColors` to define the color shown on the web view of each log level, and `memory_lines_length`, to define the the log registry  length.

In future versions there will be more options, such as authentication enable (with user and password), custom log levels or default level filter in the view.

| Param | type | description |
| -- | -- | -- |
| styles.levelsColors | Object | Defines the color of each log level |
| memory_lines_length | Int | Set max number log entries stored on memory |
| enable_console_print | Boolean | Enables the cosole printing of entries. By default false |
| enable_colorful_console | Boolean | Enables the color style on console printing |
| log_level | String | Established the minimum log level to register and show |

Example of configuration object:

```javascript
onlinelog(app, 
	{
		memory_lines_length:  2,
		styles:{
			levelsColors: 
			{
				trace:  "#fff"
			}
	}
});
```

**Note** that you don't have to specified levels and its color. Missing level will get default color.

### Web view

Web view is the main purpose of the module. Use the online example to test functionalities: [online-demo](https://autos-la-valenciana.ew.r.appspot.com/online-log/view)
Main aspects of the web view are:

 - Level badges with the count of entries by level
 - Proportion bar that shows the percentage of entries with each level 
 - Filtering entries by level clicking on the level badges bar
 - Refresh interval selector
 - Contextual menu left-clicking on an entry with currently two options (clearlog, findnext)




# Future

As mention earlier, future versions will include:

 - Autentication on web view
 - More customization of log levels and default options
 - More end-points to explore and extract value of your loggin information.
 - Dashboard of log resumen by time
 - Time period filter on web view
 - More options on contextual menu on web view like; find-previus, highlight similar, checkout on google, or copy message.
 - Responsive design for mobile.
