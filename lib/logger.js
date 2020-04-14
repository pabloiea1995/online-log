

module.exports = {

    logger: {

        dateTime: [],
        level: [],
        process: [],
        content: [],
        uid: [],

    },

    /**
     * Add log entry to logger
     * @param {string} level 
     * @param {string} content 
     */
    log: function (level, content) {

        if (!level || !content) {
            throw new SyntaxError("Missing parameter");
        }
        else if (typeof (level) != "string" || typeof (content) != "string") {
            throw new TypeError("Parameterns must be type string");
        }




        //add current date to logger entry
        fillArray(module.exports.logger.dateTime, new Date());

        //check if level string is correctly formed
        //logs level allowed are:
        //ALL, TRACE, DEBUG, INFO, WARN,  ERROR, FATAL
        if (level.toLocaleUpperCase().localeCompare("ALL") == 0 ||
            level.toLocaleUpperCase().localeCompare("TRACE") == 0 ||
            level.toLocaleUpperCase().localeCompare("DEBUG") == 0 ||
            level.toLocaleUpperCase().localeCompare("INFO") == 0 ||
            level.toLocaleUpperCase().localeCompare("WARN") == 0 ||
            level.toLocaleUpperCase().localeCompare("ERROR") == 0 ||
            level.toLocaleUpperCase().localeCompare("FATAL") == 0) {

        } else {
            throw new SyntaxError("Log level is not recognized")
        }
        //Once parameter is accepted, add level to logger object
        fillArray(module.exports.logger.level, level)
        //Add content to logger object if it is string
        fillArray(module.exports.logger.content, content)
        //Add to the process property the file where the log is being creating
        //module.exports.logger.process.push(_getCallerFile().split("/")[_getCallerFile().split("/").length-1]);
        fillArray(module.exports.logger.process, _getCallerFile().split("/")[_getCallerFile().split("/").length - 1])
        //Finaly add uid to logger object for further comparations
        /*FIXME: level_max_length en produccion tiene que introducirse por configuración en parametros de entorno*/
        //module.exports.logger.uid.push(Math.floor(Math.random() * module.exports.memory_lines_length))
        fillArray(module.exports.logger.uid, generateUid());

        //At the end, log current message to show it on terminal too if option is enable
        if(module.exports.consolePrint){
            console.log(`${new Date().toISOString()} -- ${level}: [${_getCallerFile().split("/")[_getCallerFile().split("/").length - 1]}] -- ${content}`)

        }

        return;
    },
    /**
     * Function to initialize module variables. Current options are:
     * memory_lines_length {int}: set max number of cached log lines stored by logger || 1000
     * @param {Object} options 
     */
    initialiceLogger: function (options = {}) {

        module.exports.memory_lines_length = options.memory_lines_length || 1000;
        module.exports.consolePrint = options.consolePrint || false

        return;

    }
}

function _getCallerFile() {
    var originalFunc = Error.prepareStackTrace;
    var callerfile;
    try {
        var err = new Error();
        var currentfile;

        Error.prepareStackTrace = function (err, stack) { return stack; };

        currentfile = err.stack.shift().getFileName();



        while (err.stack.length) {
            callerfile = err.stack.shift().getFileName();

            if (currentfile !== callerfile) break;
        }
    } catch (e) { }

    Error.prepareStackTrace = originalFunc;

    return callerfile;
}
/**
 * Auxiliar function to fill arrays mantening the max length substituting las first element 
 * @param {Object} element 
 */



function fillArray(array, element) {

    const max_length = module.exports.memory_lines_length;

    if (array.length >= max_length) {
        array.push(element);
        array.shift();
    }
    else {
        array.push(element);
    }
    while (array.length > max_length) {
        array.shift()
    }

    return;

}

function generateUid() {

    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);


}
/**
 * Function that prints log entry on console by index on log queue
 */
module.exports.printlog = function (component) {
    
    if(module.exports.consolePrint){
            return console.log(module.exports.logger[component])

    }
}

module.exports.getLogFromLastUid = function (lastUid) {

    //console.log( module.exports.logger.uid.length)
    let auxlog = JSON.parse(JSON.stringify(module.exports.logger));


    for (let i = module.exports.logger.uid.length - 1; i > 0; i--) {

        
        if (lastUid.localeCompare(module.exports.logger.uid[i]) == 0) {

            return {
                dateTime: auxlog.dateTime.splice(i+1, auxlog.dateTime.length-1),
                level: auxlog.level.splice(i+1, auxlog.level.length-1),
                process: auxlog.process.splice(i+1, auxlog.process.length-1),
                content: auxlog.content.splice(i+1, auxlog.content.length-1),
                uid: auxlog.uid.splice(i+1, auxlog.uid.length-1)

            }

        }
        

    }
    return module.exports.logger;

}