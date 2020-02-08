
window.onload = load;
    

var lastUid = ""
var frequency = 30000

let printedUids = []
function load(){
    httpGet();
    setInterval(updateLog, frequency);
}

function renderContent(content) {


    if (content) {
        //console.log(JSON.parse(content));
        content = JSON.parse(content);
        var body = document.getElementById("context");
        console.log(content.content)
        

        for (var i = 0; i < content.level.length; i++) {
            
            if(!printedUids.includes(content.uid[i])){
            console.log(i);
            p = document.createElement("P");
            p.innerHTML = `${content.dateTime[i]} -- ${content.level[i]}: [${content.process[i]}] -- ${content.content[i]}`;
            body.appendChild(p)

            printedUids.push[content.uid[i]]
            }
        }
    }
}

function httpGet() {

    

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/online-log", false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp.responseText)
    function reloadLog() {

        
        renderContent(xmlHttp.responseText);

        lastUid = JSON.parse(xmlHttp.responseText).uid[JSON.parse(xmlHttp.responseText).uid.length -1]
        console.log(lastUid)
        //setInterval(updateLog, frequency)

    }
    return reloadLog()//setInterval(reloadLog, frequency)

}


function updateLog(){

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/online-log/update/"+ lastUid, false); // false for synchronous request
    xmlHttp.send(null);
    console.log(xmlHttp.responseText)
    function reloadLog() {

        
        renderContent(xmlHttp.responseText); 

    }
    return reloadLog()

}

