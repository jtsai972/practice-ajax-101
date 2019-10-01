var topics = ["puppies", "kitties", "baby bunnies", "ducklings", "puppy", "kitty", "bunnies", "hamster", "cats", "dogs", "corgis", "red pandas", "quokka", "cute", "cute animals", "baby animals", "adorable animals"];
//
var str, imgStill, imgAnimate;

var favCookie, favImg, favArray = [];

//API variables
var myKey = "qzlhtmpfdoOXU95kvVJ4TIH9hkBxj8Od"; //api key

// ToDo: Properly name and set these up, these are placeholders

var queryValue = "",
    queryRequest = "",
    queryTitle; 
//May make these adjustable variables
var queryLimit = 10
var queryRating = "G";
var queryOffset = 0;

//This needs to go after the terms in it
var queryURL = 
    "https://api.giphy.com/v1/gifs/search?" +
    "api_key=" + myKey + 
    "&limit=" + queryLimit + 
    "&rating=" + queryRating + 
    "&offset="; //need to add offset and query default ending

//Button vars
buttonCollapse = false;


//generating topics at the start
for(let i = 0; i < topics.length; i++) {
    buttonGen(topics[i]);
}
$(".fav").hide();

//Do this after page loads
$(document).ready(function () {
    $("nav button").on("click", function(){
        var clickId = $(this).attr("id");
        var slideFast = 400;
        var slideSlow = 700;

        if(clickId === "nav-images"){
            console.log("nav-images clicked");
            $(".img").slideDown(slideFast);
            $(".fav").slideUp(slideFast);
        } else {
            console.log("nav-favorites clicked");
            $(".fav").slideDown(slideFast);
            $(".img").slideUp(slideFast);
        }

        /*
        if(clickId === "nav-images"){
            console.log("nav-images clicked");
            $("#buttons").show();
            $("#images").show();
            $("#favorites").hide();
        } else {
            console.log("nav-favorites clicked");
            $("#favorites").show();
            $("#buttons").hide();
            $("#images").hide();
        }*/
    })

    $("#search form button").on("click", function(){
        event.preventDefault();
        console.log("submitted");
        
        var queryNew = $("input").val();
        console.log(queryNew);

        buttonGen(queryNew);

        $('#search form').trigger("reset");
    });

    $("#search button").on("click", function(){
        event.preventDefault();
        var clicked = $(this).attr("id");
        
        if(clicked === "clearBtn") {
            $("#buttons .container").empty();
        } else {
            $("#images .container").empty();
        }

        
    });


    $("#buttons").on("click", ".container button", function() {
        var queryValue = $(this).attr("data-query");
        var queryOffset = $(this).attr("data-offset");

        //console.log(`Topic: ${queryValue}, Offset: ${queryOffset}`);

        var queryRequest = queryURL + queryOffset +
        "&lang=en&q=" + queryValue;
        //console.log(queryRequest);
        
        //Call queryAPI
        queryAPI(queryRequest);

        //Offset the images by 10 every time this button is clicked
        $(this).attr("data-offset", (parseInt(queryOffset) + 10));
        //console.log(queryOffset);
    });

    $(".container").on("click", "figure", function() {
        console.log("image click");

        var img = $(this).find("img");
        //console.log(img);

        toggleAnimation(img);
    })

    // Image Mouseover
    $("main").on("mouseenter", "figure", function() {
        //console.log("mouse enter");
        var img = $(this).find("img");

        img.attr({
            "src": img.attr("data-animate"), 
            "data-state": "animate"
        });
    })

    // Image Mouseout
    $("main").on("mouseleave", "figure", function() {
        //console.log("mouse leave");
        var img = $(this).find("img");

        img.attr({
            "src": img.attr("data-still"), 
            "data-state": "still"
        });
    })

    $("#images").on("click", ".favBtn", function() {
        var imgFav = $(this).parent().find("img");
        console.log(imgFav);

        var newFav = {
            animate: imgFav.attr("data-animate"),
            rating: imgFav.attr("data-rating"),
            src: imgFav.attr("src"),
            still: imgFav.attr("data-still"),
            title: imgFav.attr("alt")
        };
        console.log(newFav);

        favorite(newFav);
    });

    //removing favorite
    $("#favorites").on("click", ".favBtn", function() {
        var unFav = $(this).parent();
        console.log(unFav);

        unFav.remove();
    });

    
});

// ? Welcome to functions

function buttonGen(str) {
    var btnContainer = $("#buttons .container")
    var newButton = $("<button>")
        .text(str)
        .attr({
            "data-query" : (str.replace(/\s/g,'/')),
            "data-offset" : 0
        });

    btnContainer.prepend(newButton);

    /* if ((buttonCollapse === false) && (btnContainer.height() > 200)) {
        buttonCollapse == true;
        btnContainer.addClass("collapse");
        $("#buttons .more").removeClass("collapse");
    } */
}

function imageGen() {
    var figure = $("<figure>").append(
        $("<button class='favBtn'>").append(
            "<i class='fas fa-star'>",
            "<i class='far fa-star'>"
        ),
        $("<img>").attr({
            "alt" : queryTitle,
            "src" : imgStill,
            "data-state" : "still",
            "data-still" : imgStill,
            "data-animate" : imgAnimate,
            "data-rating" : queryRating
        }),
        $("<figcaption>").append(
            $("<p class='title'>").text(queryTitle),
            $("<p>").text(`${queryRating}-rated content`)

        )
    );

    $("#images .container").prepend(figure);
}

function queryAPI(queryURL) {
    // ? Ajax incoming
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then( function(response) {
        var queryResult = response;
        

        for(let i = 0; i < queryLimit; i++) {
            var queryPath = queryResult.data[i];

            imgStill = queryPath.images.fixed_height_still.url;
            imgAnimate = queryPath.images.fixed_height.url;
            queryRating = queryPath.rating;
            queryTitle = (queryPath.title).replace(/(GIF).*$/g, "");

            imageGen();
        }
    });
}

function favorite(fav) {
    favArray.push(fav);

    var favFig = $("<figure>").append(
        $("<button class='favBtn'>").append(
            "<i class='fas fa-star'>",
            "<i class='far fa-star'>"
        ),
        $("<img>").attr({
            "alt" : fav.title,
            "src" : fav.still,
            "data-state" : "still",
            "data-still" : fav.still,
            "data-animate" : fav.animate
        }),
        $("<figcaption>").append(
            $("<p class='title'>").text(fav.title),
            $("<p>").text(`${fav.rating}-rated content`)
        )
    );

    $("#favorites .container").append(favFig);
}

function toggleAnimation(img){
    var state = img.attr("data-state");
        //console.log(state);

    state === "still" ?
        img.attr({
            "src": img.attr("data-animate"), 
            "data-state": "animate"
        }) :
        img.attr({
            "src": img.attr("data-still"), 
            "data-state": "still"
        });
}

// // ToDo: Create an array of starter topics

// // ToDo: Get input to add a new topic button

// // ToDo: set up ajax
// // ToDo: Create a variable for the api url and search topic

// Functions 
// // ToDo: make something to generate and append the buttons

// // ToDo: print 10 gif thumbnails to the page

// ToDo: Show gif PG rating (better make it look nice)

// // ToDo: make gif start/stop running on click;
// // ToDO: make gif start on hover 


/**
 * ! Bonus
 * * Add a persistent favorites section (possibly with cookies)
 * * Make this responsive
 * * Integrate with other APIs
 * * make it so you can scroll down and get 10 more gifs
 */