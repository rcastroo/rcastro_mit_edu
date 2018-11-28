let isMobile = false; //initiate as false
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
}


let currentPIs = null;
let pageContainer  = document.createElement('div');;
let selection = "All";
let loadedOnce=false;

let regeneration = document.createEvent('Event');
regeneration.initEvent('regeneration', true, true);


function dothis() {
    document.getElementById("first").innerHTML = "YAP";
}

dothis();


// importance(1-10max)
function PortfolioItem(title, summary, date, type, importance, picture, url, buildBlog_redirect, tags, inProgress) {
    // document.getElementById("test_container").innerText = "GOT HERE-0.6";
    this.title = title;
    this.summary = summary;
    this.date = date;

    this.type = type;
    this.importance = importance;
    this.picture = picture;
    this.url = url;
    this.buildBlog_redirect = buildBlog_redirect;
    this.inProgress = inProgress;
    this.tags = tags;
    this.HTMLcontainer = generatePISkeleton(this);
}

function loadItems(portfolioItems) { //used to inject javascript array that contains all the information from each project
    // document.getElementById("test_container").innerText = "GOT HERE-1";

    var items = [];
    portfolioItems.forEach(function (PI_ARR) {
        //items.push(PI_ARR);

        //   document.getElementById("test_container").innerText = portfolioItems;
        //  document.getElementById("test_container").innerText = PI_ARR;
        var pi = new PortfolioItem(PI_ARR[0], PI_ARR[1], PI_ARR[2], PI_ARR[3], PI_ARR[4]
            , PI_ARR[5], PI_ARR[6], PI_ARR[7], PI_ARR[8], PI_ARR[9]);
        items.push(pi);

    });
    return items;
}

function generatePage(portfolioItems) {


// device detection
    let HBoxsARR = [];

    let PIsover7 = 0;
    let sorted = portfolioItems.filter(function(PI){
        let isSelected = false;
        if(selection=="All"){
            return true;
        }
        PI.tags.split(';').forEach(tag=> isSelected= tag==selection? true: isSelected);
        return isSelected;
    }).sort(function (a, b) {
        return b.importance - a.importance;
    });
    sorted.forEach((PI)=> PIsover7 = PI.importance>=7? PIsover7+1:PIsover7);
    PIsover7 = PIsover7==0? 1:PIsover7;
    let count = 0;


    let carryOverPI = null;
    if (isMobile) {
        sorted.forEach(function (pi) {
            count++;
            let HBox_Mobile = generateHBox_mobile(pi);
            HBoxsARR.push(HBox_Mobile);
        })
    } else {
        sorted.forEach(function (pi) {
            count++;
            if (count <= PIsover7) {
                let HBox_single = generateHBox_single(pi);
                HBoxsARR.push(HBox_single);

            } else {
                if (carryOverPI == null) {
                    //if this isn't the last PI, carry it over to create a double
                    if (count != sorted.length) {
                        carryOverPI = pi;
                    } else {
                        let HBox_single = generateHBox_single(pi);
                        HBoxsARR.push(HBox_single);
                    }
                } else {
                    let HBox_double = generateHBox_double(carryOverPI, pi);
                    carryOverPI = null;
                    HBoxsARR.push(HBox_double);
                }

            }
        });
    }

    //get rid of all hboxes, to put in new ones
    count = 0;
    let timeOut=0;
    while (pageContainer.children.item(count) && timeOut<5000) {
        if(pageContainer.children.item(count).className.startsWith("HBox")){
             pageContainer.removeChild(pageContainer.children.item(count));
        }else{
            count++;
        }
        timeOut++;
    }
    HBoxsARR.forEach(function (hbox) {
        pageContainer.appendChild(hbox);
    });

    pageContainer.dispatchEvent(regeneration);


}


function test0(portfolioItems) {


    pageContainer.style.width = "100%";
    pageContainer.style.height ="100%";

    //create tagMap to get the most popular tags, then make the selection bar
    let tagMap = new Map();
    portfolioItems.forEach(function(PI){
        PI.tags.split(';').forEach(function(tag){
            tagMap.set(tag, tagMap.get(tag)==null? 1:tagMap.get(tag)+1 );
        });
    });
    let arrangedTags = Array.from(tagMap.keys());
    arrangedTags.sort(function(a,b){
        return tagMap.get(b) -tagMap.get(a);
    });

     pageContainer.appendChild(generateSelectionBar(arrangedTags));

    //
    currentPIs= portfolioItems;
    generatePage(currentPIs);
    document.getElementById("test_container").appendChild(pageContainer);

    // document.getElementById("test_container").innerText =;


    //  document.getElementById("test_container").innerText = "GERE10";

    //
    // var bigbox = generateHBox_single( portfolioItems[4]);
    // document.getElementById("test_container").appendChild(bigbox);
    //
    // var box = generateHBox_double( portfolioItems[0],portfolioItems[1]);
    // document.getElementById("test_container").appendChild(box);
    // var box2 = generateHBox_double( portfolioItems[2],portfolioItems[3]);
    // document.getElementById("test_container").appendChild(box2);

}


function generateHBox_double(PI1, PI2) {
    var HBox = document.createElement('div');
    HBox.className = "HBox";
    PI1.HTMLcontainer.className = "container_small";
    PI1.HTMLcontainer.children.namedItem(PI1.title + "_PI_SUMMARY").style.fontSize = "20px";
    PI2.HTMLcontainer.className = "container_small";
    PI2.HTMLcontainer.children.namedItem(PI1.title + "_PI_SUMMARY").style.fontSize = "20px";


    HBox.appendChild(PI1.HTMLcontainer);
    HBox.appendChild(PI2.HTMLcontainer);


    return HBox;
}

function generateHBox_mobile(PI1) {
    var HBox = document.createElement('div');
    // HBox.style = "background: blue;";
    HBox.className = "HBox_mobile";
    PI1.HTMLcontainer.className = "container_big";
    PI1.HTMLcontainer.children.namedItem(PI1.title + "_PI_SUMMARY").style.fontSize = "23px";

    HBox.appendChild(PI1.HTMLcontainer);

    return HBox;
}


function generateSelectionBar(type_selections) {
    //type_selections = ["All","Mechanical", "Science", "Making", "Engineering", "Potato","Cool Stuff", "Robotics"];
    type_selections.unshift("All");
    let bar = document.createElement('div');

    if(!isMobile){
        type_selections.forEach(function (type_name) {
            let bar_selection_button = document.createElement('div');
            bar_selection_button.className = "selectionButton";
            bar_selection_button.onmouseenter = function(){
                bar.style.background= getColorFromType(type_name);
            };
            bar_selection_button.onmouseleave = function(){
                bar.style.background= getColorFromType(selection);
            };
            bar_selection_button.onclick = function(){
                selection = type_name;
                generatePage(currentPIs);
            }

            bar_selection_button.innerText = type_name;
            bar.appendChild(bar_selection_button);
        });
    }else{
        let selector=  document.createElement('select');
        selector.className="selectionList";
        selector.value = "All";
        selector.onchange =  function(){
            selection = selector.value;
            bar.style.background = getColorFromType(selection);
            generatePage(currentPIs);
        };
         type_selections.forEach(function(type){
             let option = document.createElement("option");
             option.text=type;
             selector.add(option);

         });

         bar.appendChild(selector);
    }

    bar.className = "selectionBar";


    return bar;
}

function generateHBox_single(PI1) {
    var HBox = document.createElement('div');
    // HBox.style = "background: blue;";
    HBox.className = "HBox_big";
    PI1.HTMLcontainer.className = "container_big";
    PI1.HTMLcontainer.children.namedItem(PI1.title + "_PI_SUMMARY").style.fontSize = "23px";

    HBox.appendChild(PI1.HTMLcontainer);

    return HBox;
}

//["Mechanical", "Science", "Making", "Engineering", "Potato"];
function getColorFromType(type) {
    switch (type) {
        case "Programming":
        case "Java":
            return "#3bb2c2"
            break;
        case "MECHE":
        case "Controls":
        case "Mechanical":
        case "Design":
            return "#3e6dff"
            break;
        case "SCIENCE":
        case "Science":
            return "#1aa327"
            break;
        case "WEBDEV":
        case "Web":
            return "#ae9846"
            break;
        case "Outreach":
            return "#ff0c03";
            break;
        case "Robotics":
        case "Engineering":
        case "FIRST":
            return "#FF8614";
            break;
        case "Embedded":
        case "Electrical":
            return "#631329";
            break;

        case "All":
            return "#6593F5";
            break;
        default:
            return "#4f928b";
            break;
    }
}

function generatePISkeleton(portfolioItem) {
    var container = document.createElement('div');
    container.id = portfolioItem.title + "_PI_CONTAINER";
    container.className = "container_small";

    var image = document.createElement('div');
    //image.src = portfolioItem.picture;
    image.id = portfolioItem.title + "_PI_IMAGE";
    image.style.backgroundImage = "url(" + portfolioItem.picture + ")";
    image.className = "portfolio_image";
    container.appendChild(image);

    var summary_trapezoid = document.createElement('div');
    summary_trapezoid.id = portfolioItem.title + +"_PI_SUMMARYTRAPEZOID";
    summary_trapezoid.className = "trapezoid";
    summary_trapezoid.style.background = getColorFromType(portfolioItem.type);
    summary_trapezoid.style.opacity = "0.7";
    container.appendChild(summary_trapezoid);

    var title = document.createElement('div');
    title.id = portfolioItem.title + "_PI_TITLE";
    title.className = "port_title";
    title.innerText = portfolioItem.title;
    container.appendChild(title);

    var date = document.createElement('div');
    date.id = portfolioItem.title + "_PI_DATE";
    date.className = "date";
    date.innerText = portfolioItem.date;
    container.appendChild(date);

    //setup of tags
    var tagsBox = document.createElement('div');
    tagsBox.id = portfolioItem.title = "PI_TAGSBOX";
    tagsBox.className = "tagsBox";

    var tags = portfolioItem.tags.split(";");
    tags.forEach((function (tag) {
        var tagCont = document.createElement('div');
        tagCont.className = "tag";
        tagCont.innerText = tag;
        tagsBox.appendChild(tagCont);
    }));
    container.appendChild(tagsBox);


    var summary = document.createElement('div');
    summary.id = portfolioItem.title + "_PI_SUMMARY";
    summary.className = "summary";
    summary.style.background = getColorFromType(portfolioItem.type);
    summary.style.opacity = "1.0";
    summary.style.display = "none";

    var summaryText = document.createElement('div');
    summaryText.innerText = portfolioItem.summary;
    summaryText.style.width="100%";
    summaryText.style.height="100%";
    summaryText.style.display="inline-block";
    summaryText.style.overflow="hidden"
    summary.appendChild(summaryText)

    container.appendChild(summary);

    if(!isMobile){
        container.onmouseenter = function () {
            summary.style.display = "block";
            summary_trapezoid.style.display = "none";
            tagsBox.style.width = "100%";
            image.style.opacity = "0.9";
        }

        container.onmouseleave = function () {
            summary.style.display = "none";
            summary_trapezoid.style.display = "block";
            tagsBox.style.width = "35%";
            image.style.opacity = "1.0";
        }

    }

    container.onclick = function () {
        window.location.href = portfolioItem.url;
    }

    if (isMobile) {
        title.style.fontSize = "40px";
    } else {
        window.addEventListener("load", function () {
            title.style.fontSize = (container.getBoundingClientRect().width / 12).toString() + "px";
            loadedOnce=true;
        });

        pageContainer.addEventListener("regeneration", function(){
            if(loadedOnce){
                title.style.fontSize = (container.getBoundingClientRect().width / 12).toString() + "px";
            }
        });

        window.addEventListener("resize", function () {
            title.style.fontSize = (container.getBoundingClientRect().width / 12).toString() + "px";
        });
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


