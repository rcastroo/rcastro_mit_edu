function dothis() {
    document.getElementById("first").innerHTML = "YAP";
}
dothis();



// importance(1-10max)
function PortfolioItem(title, summary,date, type,  importance, picture, url, buildBlog_redirect, tags, inProgress) {
   // document.getElementById("test_container").innerText = "GOT HERE-0.6";
    this.title = title;
    this.summary = summary;
    this.date = date;

    this.type =type;
    this.importance = importance;
    this.picture = picture;
    this.url = url;
    this.buildBlog_redirect = buildBlog_redirect;
    this.inProgress = inProgress;
    this.tags= tags;
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
            ,PI_ARR[5],PI_ARR[6],PI_ARR[7],PI_ARR[8],PI_ARR[9]);
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
    var bigbox = generateHBox_single(600, portfolioItems[4]);
    document.getElementById("test_container").appendChild(bigbox);

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
    HBox.className = "HBox_big";
    PI1.HTMLcontainer.className= "container_big";
    PI1.HTMLcontainer.children.namedItem(PI1.title + "_PI_SUMMARY").style.fontSize = "23px";

    HBox.appendChild(PI1.HTMLcontainer);

    return HBox;
}

function getColorFromType(type){
    switch(type){
        case "MECHE":
            return "rgba(79,102,255,0.7)";
            break;
        case "SCIENCE":
            return "rgba(0,150,0,0.7)";
            break;
        case "WEBDEV":
            return "rgba(155,0,0,0.7)";
            break;
        default:
            return "rgba(155,155,50,0.7)";
            break;
    }
}

function generatePISkeleton(portfolioItem){
    var container = document.createElement('div');
    container.id = portfolioItem.title + "_PI_CONTAINER";
    container.className = "container_small";

    var image = document.createElement('div');
    //image.src = portfolioItem.picture;
    image.id = portfolioItem.title + "_PI_IMAGE";
    image.style.backgroundImage = "url(" +portfolioItem.picture+")";
    image.className = "portfolio_image";
    container.appendChild(image);

    var summary_trapezoid = document.createElement('div');
    summary_trapezoid.id = portfolioItem.title + + "_PI_SUMMARYTRAPEZOID";
    summary_trapezoid.className =  "trapezoid";
    summary_trapezoid.style.background = getColorFromType(portfolioItem.type);
    container.appendChild(summary_trapezoid);

    var title = document.createElement('div');
    summary_trapezoid.id = portfolioItem.title + "_PI_TITLE";
    title.className = "title";
    title.innerText = portfolioItem.title;
    container.appendChild(title);

    var date = document.createElement('div');
    summary_trapezoid.id = portfolioItem.title + "_PI_DATE";
    date.className = "date";
    date.innerText = portfolioItem.date;
    container.appendChild(date);

    //setup of tags
    var tagsBox = document.createElement('div');
    tagsBox.id = portfolioItem.title = "PI_TAGSBOX";



    var summary = document.createElement('div');
    summary.id = portfolioItem.title + "_PI_SUMMARY";
    summary.className = "summary";
    summary.innerText = portfolioItem.summary;
    summary.style.background = getColorFromType(portfolioItem.type);
    summary.style.display = "none";
    container.appendChild(summary);

    container.onmouseenter = function(){
        summary.style.display = "block";
        summary_trapezoid.style.display = "none";
    }

    container.onmouseleave = function(){
        summary.style.display = "none";
        summary_trapezoid.style.display = "block";
    }
    // window.addEventListener("resize", function(){
    //     if(summary_trapezoid.getBoundingClientRect().width >300){
    //         summary.style.display = "block";
    //     }else{
    //         summary.style.display = "none";
    //     }
    // });



    return container;
}


