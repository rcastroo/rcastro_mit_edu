function dothis() {
    document.getElementById("first").innerHTML = "YAP";
}
dothis();



// importance(1-10max)
function PortfolioItem(title, summary,date, type,  importance, picture, url, buildBlog_redirect, inProgress) {
    document.getElementById("test_container").innerText = "GOT HERE-0.6";
    this.title = title;
    this.summary = summary;
    this.date = date;

    this.type =type;
    this.importance = importance;
    this.picture = picture;
    this.url = url;
    this.buildBlog_redirect = buildBlog_redirect;
    this.inProgress = inProgress;
   this.HTMLcontainer = generatePISkeleton(this);
}

function loadItems(portfolioItems){ //used to inject javascript array that contains all the information from each project
   // document.getElementById("test_container").innerText = "GOT HERE-1";

    var items = [];
    portfolioItems.forEach(function(PI_ARR){
        //items.push(PI_ARR);

     //   document.getElementById("test_container").innerText = portfolioItems;
      //  document.getElementById("test_container").innerText = PI_ARR;
         var pi = new PortfolioItem(PI_ARR[0],PI_ARR[1],PI_ARR[2],PI_ARR[3],PI_ARR[4]
            ,PI_ARR[5],PI_ARR[6],PI_ARR[7],PI_ARR[8]);
        items.push(pi);

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



function test0(portfolioItems){
    var box = generateHBox_double(600, portfolioItems[0],portfolioItems[1]);
    document.getElementById("test_container").appendChild(box);
    var box2 = generateHBox_double(600, portfolioItems[2],portfolioItems[3]);
    document.getElementById("test_container").appendChild(box2);
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
    PI1.HTMLcontainer.getElementById("")
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
    summary.id = portfolioItem + "_PI_SUMMARY";
    summary.className = "summary-small";
    summary.innerText = portfolioItem.summary;
    container.appendChild(summary);


    return container;
}


