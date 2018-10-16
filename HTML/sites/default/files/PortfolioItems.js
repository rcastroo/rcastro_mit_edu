

var portfolioItems = [CRUSH_ARR +];

var PI_TYPE = {
    MECHE : 0,
    WEBDEV : 1,
    EMBEDDED: 2
}

var CRUSH_ARR = PI_Arr_init(
    "CRUSH",  //title
    //summary
    "Here we can see the awesome things we can achieve in a team\n" +
    "I love pancakes" +
    "Woop woooooop"
    ,
    PI_TYPE.MECHE,
    6,//importance
    "http://rcastro.mit.edu/sites/default/files/CRUSH_3JEER.png", //picture
    "rcastro.mit.edu",     //url
    "rcastro.mit.edu",     //build_blog redirect
    false //inprogress
);



function PI_Arr_init(title, summary, type,  importance, picture, url, buildBlog_redirect, inProgress){
    return [title, summary, importance, picture, url, buildBlog_redirect, inProgress]
}