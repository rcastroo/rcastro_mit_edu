function dothis() {
    document.getElementById("first").innerHTML = "YAP";
}
dothis();



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
   this.HTMLcontainer = generatePISkeleton(this);
}

function loadItems(portfolioItems){ //used to inject javascript array that contains all the information from each project
    var items = [];
    portfolioItems.forEach(function(PI_ARR){
       items.push(new PortfolioItem(PI_ARR[0],PI_ARR[1],PI_ARR[2],PI_ARR[3],PI_ARR[4]
           ,PI_ARR[5],PI_ARR[6],PI_ARR[7],));
    });
    return items;
}

function generatePage(width, portfolioItems){
    var BIG = 0;
    if(width>1000){
        BIG = 1;
    }

    var hBoxes = [];
    var PI_items = loadItems(portfolioItems);
    if(BIG){

    }

}



function test0(){
    document.getElementById("test_container").innerText = "GOT HERE00";

    var PI1 = new PortfolioItem("CRUSH", "THIS IS CRUSH\n" + "YAP", "EMBEDDED",8,"http://rcastro.mit.edu/sites/default/files/CRUSH_3JEER.png"
    , "rcastro.mit.edu","rcastro.mit.edu",true);
    var PI2 = new PortfolioItem("CRUSH2", "THIS IS CRUSH\n" + "YAP", "EMBEDDED",8,"http://rcastro.mit.edu/sites/default/files/CRUSH_3JEER.png"
        , "rcastro.mit.edu","rcastro.mit.edu",true);

    var box = generateHBox_double(600, PI1,PI2);


    var text = document.createElement('p');
    text.innerText = "FADSFSDFSADF\nsdafadsfsdafds";
    document.getElementById("test_container").appendChild(box);
}
function generateHBox_double(width, PI1, PI2){
    var HBox = document.createElement('div');
    HBox.className = "HBox";

    HBox.appendChild(PI1.HTMLcontainer);
    HBox.appendChild(PI2.HTMLcontainer);


    return HBox;
}

function generateHBox_single(width, PI1){
    var HBox = document.createElement('div');
   // HBox.style = "background: blue;";
    HBox.className = "HBox";

    HBox.appendChild(PI1.HTMLcontainer);

    return HBox;
}


function generatePISkeleton(portfolioItem){
    var container = document.createElement('div');
    container.id = portfolioItem.title + "_PI_CONTAINER";
    container.className = "container_small";

    var image = document.createElement('img');
    image.src = portfolioItem.picture;
    image.className = "portfolio_image";
    container.appendChild(image);

    var summary_trapezoid = document.createElement('div');
    summary_trapezoid.id = portfolioItem + "_PI_SUMMARYTRAPEZOID";
    summary_trapezoid.className =  "trapezoid_small";
    container.appendChild(summary_trapezoid);

    var title = document.createElement('div');
    summary_trapezoid.id = portfolioItem + "_PI_TITLE";
    title.className = "title";
    title.innerText = portfolioItem.title;
    container.appendChild(title);

    var date = document.createElement('div');
    summary_trapezoid.id = portfolioItem + "_PI_DATE";
    date.className = "date";
    date.innerText = portfolioItem.date;
    container.appendChild(date);

    var summary = document.createElement('div');
    summary_trapezoid.id = portfolioItem + "_PI_SUMMARY";
    summary.className = "summary";
    summary.innerText = portfolioItem.summary;
    container.appendChild(summary);


    return container;
}


