
var express = require('express');
var router = express.Router();
var onlinelogger = require('./logger');
var path = require("path")
router.get("/", (req, res) =>{

    res.json(onlinelogger.logger)

});
router.get("/update/:uid", (req, res) =>{

    var lastUid = req.params.uid;

    res.json(onlinelogger.getLogFromLastUid(lastUid));

})
router.get("/view", (req, res) =>{
    
    res.sendFile(path.resolve('view/index.html'));
})
router.get("/log", (req, res) =>{

    onlinelogger.log("ALL", `update`);
    res.json("ipdated")

});

module.exports = router
