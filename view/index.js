
window.onload = load;

window.addEventListener("scroll",trasparentMenu)

function trasparentMenu(){

    document.getElementById("menu-bar").style.backgroundColor = "#f1f2f3b0"

    setTimeout(function(){ document.getElementById("menu-bar").style.backgroundColor = "#f1f2f3" }, 2000);
  


}

var lastUid = ""
var frequency = 5000
var displayedMenu = false;
var lastTarget;
var styleProps = {

    levelColors: {

        trace: "#d8d7d7",
        info: "#365f92",
        debug: "#007d3c",
        warning: "#e0da1e",
        error: "#ff5353",
        fatal: "#f00000"

    }



}
var logCounter = {

    trace: 0,
        info: 0,
        debug: 0,
        warning: 0,
        error: 0,
        fatal: 0,
        total: 0,

}
function loadStyles() {

    document.getElementsByTagName('style')[0].innerHTML = `
    
    .trace{
        background-color:${styleProps.levelColors.trace};
        color: black;
    }
    .info{
        background-color:${styleProps.levelColors.info}
    }
    .debug{
        background-color:${styleProps.levelColors.debug}
    }
    .warning{
        background-color:${styleProps.levelColors.warning}; 
        color: black;
    }
    .error{
        background-color:${styleProps.levelColors.error}
    }
    .fatal{
        background-color:${styleProps.levelColors.fatal}
    }
    
    
    `;
}
let printedUids = []
function load() {
    
    loadStyles();
    httpGet();
    setInterval(updateLog, frequency);
}

function renderContent(content) {


    if (content) {
        //console.log(JSON.parse(content));
        content = JSON.parse(content);
        var body = document.getElementById("logCanvas");
        //console.log(content.content)


        for (var i = 0; i < content.level.length; i++) {

            logCounter.total++;
            if (!printedUids.includes(content.uid[i])) {
                //console.log(i);
                p = document.createElement("P");
                var levelClassName = "";
                switch (content.level[i]) {
                    case "TRACE":
                        levelClassName = "trace";
                        logCounter.trace++;
                        break;
                    case "INFO":
                        levelClassName = "info";
                        logCounter.info++;
                        break;
                    case "DEBUG":
                        levelClassName = "debug";
                        logCounter.debug++;
                        break;
                    case "WARN":
                        levelClassName = "warning";
                        logCounter.warning++;
                        break;
                    case "ERROR":
                        levelClassName = "error";
                        logCounter.error++;
                        break;
                    case "FATAL":
                        levelClassName = "fatal";
                        logCounter.fatal++;
                        break;
                    case "ALL":
                        levelClassName = "all";
                        logCounter.all++;
                        break;

                }
                p.className = levelClassName + "Log";
                p.innerHTML = `${content.dateTime[i]} -- <span class="${levelClassName}">${content.level[i]}:</span> <span class="process">[${content.process[i]}]</span> -- ${content.content[i]}`;
                p.style.borderRight = `solid ${styleProps.levelColors[levelClassName]}`;
                p.setAttribute("id", content.uid[i])
                p.addEventListener("click",displayMenu) 
                updateCounters();

                body.appendChild(p)

                printedUids.push[content.uid[i]]
                
            }
        }
        updateDistTable();
    }
}

function httpGet() {



    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/online-log", false); // false for synchronous request
    xmlHttp.send(null);
    //console.log(xmlHttp.responseText)
    function reloadLog() {


        renderContent(xmlHttp.responseText);

        lastUid = JSON.parse(xmlHttp.responseText).uid[JSON.parse(xmlHttp.responseText).uid.length - 1]
        console.log(lastUid)
        //setInterval(updateLog, frequency)

    }
    return reloadLog()//setInterval(reloadLog, frequency)

}


function changeOpacityUpdateSpan(){
    var updateSpan = document.getElementById("updatedSpan");
    updateSpan.style.opacity = "1";
    setTimeout(function(){
        updateSpan.style.opacity= "0"}
    ,1000)
    ;
    return
}


function updateLog() {
   
    
    changeOpacityUpdateSpan()   
    //setTimeout(changeOpacityUpdateSpan(0), 3000)

    
    var xmlHttp = new XMLHttpRequest();
    var loader =  document.getElementById("loader");
    loader.style.display = "inline"
    xmlHttp.open("GET", "/online-log/update/" + lastUid, false); // false for synchronous request
    xmlHttp.send(null);
    loader.style.display = "none"
    //console.log(xmlHttp.responseText)
    function reloadLog() {

        if(JSON.parse(xmlHttp.responseText).uid[JSON.parse(xmlHttp.responseText).uid.length - 1]){
       lastUid = JSON.parse(xmlHttp.responseText).uid[JSON.parse(xmlHttp.responseText).uid.length - 1]
        }

        renderContent(xmlHttp.responseText);

    }
   
   
    
    return reloadLog()

}

function updateCounters(){

    for(var counter in logCounter ){
        if(document.getElementById(counter)){
            document.getElementById(counter).innerHTML = logCounter[counter];
        }
    }


}

function updateDistTable(){


    var tableWidth = document.getElementById("distrTable").offsetWidth;

    var totalLogNum = logCounter.total;

  

    var element;
    var width = 0;
    for(var level in logCounter){

        if(level != "total"){

            element =  document.getElementById(level+ "Td");
            width = tableWidth * (logCounter[level]/totalLogNum);
            if((logCounter[level]/totalLogNum)*100 > 1){
                element.innerHTML = `${(logCounter[level]/totalLogNum * 100).toFixed(2)} %`
            }
            element.style.width = width + "px";
            
            element.style.backgroundColor = styleProps.levelColors[level]
        }

    }

    



}

function displayMenu(element){
    var body = document.getElementById("logCanvas");
    var m = document.getElementById("rightMenu");
    var target = element.target;
    
    if(displayedMenu && m && lastTarget){
        
        body.removeChild(m);
        displayedMenu = false
        
    }

    var pos = element;

    var elId = element.toElement.id.toString()
    var menuDiv = document.createElement("div");
    menuDiv.setAttribute("id", "rightMenu")
    menuDiv.style.top = pos.clientY+"px";
    menuDiv.style.left = pos.clientX+"px";
    target.style.backgroundColor ="#b8c0e6";
    menuDiv.style.display = "inline-block";
    menuDiv.style.position = "absolute";
    menuDiv.innerHTML = `
    <ul class="menuList">
    <li class="rightMenu-option"> Highlight similar</li>
    <li class="rightMenu-option" onclick="findNext('${elId}')"> Find next</li>
    <li class="rightMenu-option"> Find previous</li>
    <li class="rightMenu-option"> Checkout on google</li>
    <li class="rightMenu-option" onclick="hideMenu()"> x Close menu</li>
    </ul>
    `
   
    body.appendChild(menuDiv)
  
    displayedMenu = true;
    lastTarget = target

}
//TODO: Funciones del menu lateral
/*
    - Find previous
    - Highligh all
    - Checkout on google
*/
function hideMenu(){

    var body = document.getElementById("logCanvas");
    var m = document.getElementById("rightMenu");
   
    
    if(displayedMenu && m && lastTarget){
        
        body.removeChild(m);
        displayedMenu = false
        lastTarget.style.backgroundColor = "white"
    }


}
function findNext(id){
    /*
    if(id.length && id.length > 0){
        id = id[0];
    }
    */
    id = document.getElementById(id);
    var text = id.innerHTML.split("--")[2];
    var body = document.getElementById("logCanvas");
    var childrenList = body.children
    try{
    for(var element in childrenList){
        if(childrenList[element].id.localeCompare(id.id) === 0 ){

            for(var i = parseInt(element) +1; i < childrenList.length; i++){

                if(childrenList[i].innerHTML.split("--")[2].localeCompare(text) === 0){

                    childrenList[i].style.backgroundColor = "yellow";
                    hideMenu();
                    setTimeout(function(){childrenList[i].style.backgroundColor = "white"}, 2000)

                    
                    //location.href = "#" + childrenList[i].id;
                    return;
                }
            }

        }
        
       

    }
    }
    catch{
        hideMenu();
    }
    
    return;
   
    

    console.log("")


}
