
var express = require('express');
var router = express.Router();
var onlinelogger = require('./logger');
var path = require("path")
router.get("/", (req, res) =>{

    res.json(onlinelogger.logger)

});
router.get("/update/:uid", (req, res) =>{

    var lastUid = req.params.uid;
    //console.log(onlinelogger.logger.uid)
    res.json(onlinelogger.getLogFromLastUid(lastUid));
   

})
router.get("/view", (req, res) =>{
    
    res.sendFile(path.resolve('node_modules/online-log/view/index.html'));
})
router.get("/styles", (req, res) =>{
    
    res.json(onlinelogger.styles)
})
router.get("/log", (req, res) =>{
    //console.log(onlinelogger.logger.uid)

    onlinelogger.log("DEBUG", `update`);
    //console.log(onlinelogger.logger.uid)
    res.json("ipdated")

});

router.get("/clear-log", (req, res) =>{
    //console.log(onlinelogger.logger.uid)

    onlinelogger.logger = {

        dateTime: [],
        level: [],
        process: [],
        content: [],
        uid: [],

    };
    //console.log(onlinelogger.logger.uid)
    res.json("log cleared");

});

module.exports = router
