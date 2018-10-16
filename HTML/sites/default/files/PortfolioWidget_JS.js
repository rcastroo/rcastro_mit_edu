function dothis() {
    document.getElementById("first").innerHTML = "YAP";
}
dothis();

var PI_TYPE = {
   MECHE : 0,
   WEBDEV : 1,
    EMBEDDED: 2
}

// importance(1-10max)
function PortfolioItem(title, summary,type,  importance, picture, url, buildBlog_redirect, inProgress) {
    this.title = title;
    this.summary = summary;
    this.type =type;
    this.importance = importance;
    this.picture = picture;
    this.url = url;
    this.buildBlog_redirect = buildBlog_redirect;
    this.inProgress = inProgress;
}

function readPortfolioItems() {
    const testFolder = '/PortfolioItems';
    document.getElementById("title1").innerText = "11232";
    const fs = require('fs');
    document.getElementById("title1").innerText = "JB$";
    fs.readdirSync(testFolder).forEach(file => {
        document.getElementById("title1").innerText = file;
    })

    readPortfolioItem("sites\\default\\files\\PortfolioItems\\BROOMBA.Rportfolioitem")
}

function readPortfolioItem(url) {
    var text = loadFile(url);
    var lines = text.split(";");
    var piArr = [];

    lines.forEach(function(line){

        var line_sec = line.split("::");
        if(line_sec.length==2){
            line_sec[0]= line_sec[0].trim();
            line_sec[1]= line_sec[1].trim();
            if(line_sec[0]=="Title"){
                piArr[0] = line_sec[1];
            }else if(line_sec[0]=="Summary"){
                piArr[1] = line_sec[1];
            }else if(line_sec[0]=="Importance"){
                piArr[2] = line_sec[1];
            }else if(line_sec[0]=="PictureURL"){
                piArr[3] = line_sec[1];
            }else if(line_sec[0] == "true"){
                piArr[4] = line_sec[1];
            }else if(line_sec[0]=="BuildBlogURL"){
                piArr[5] = line_sec[1];
            }else if(line_sec[0]=="Progress"){
                piArr[6] = line_sec[1];
            }
        }
    });

    return new PortfolioItem(piArr[0],piArr[1],piArr[2],piArr[3],piArr[4],piArr[5],piArr[6]);
}

function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

