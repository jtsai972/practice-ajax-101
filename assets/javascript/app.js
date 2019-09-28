var topics = ["puppies", "kitties", "bunnies", "ducklings", "puppy", "kitty", "hamster", "corgis", "dogs", "cats", "red pandas", "cute", "cute animals", "baby animals", "adorable animals"];
//
var str, imgStill, imgAnimate;

//API variables
var myKey = config.giphyKey; //api key

// ToDo: Properly name and set these up, these are placeholders

var queryValue = ""; //input
var queryLimit = 10 //
var queryRating = "G";

//This needs to go after the terms in it
var queryURL = 
    "https://api.giphy.com/v1/gifs/search?" +
    "&api_key" + myKey + 
    "&limit=" + queryLimit + 
    "&rating=" + queryRating + 
    "&offset=0&lang=en" + 
    "&q=" + queryValue;

//generating topics at the start
for(let i = 0; i < topics.length; i++) {
    buttonGen(topics[i]);
}


// var img = $(this);
// var state = img.attr("data-state");

// state = (state === "still") ?
// 	img.attr({src : img.attr("data-animate"), "data-state" : "animate"}) :
// 	img.attr({src : img.attr("data-still", "data-state" : "still")})

//Do this after page loads
$(document).ready(function () {
    $("#buttons").on("click", "button", function() {

        //get button value, trim it, and then send put it into the ajax

        
    });
});

// ? Welcome to functions

function buttonGen(str) {
    var newButton = $("<button>")
        .text(str)
        .attr("data-query", (str.replace(/\s/g,'/')));

    $("#buttons").append(newButton);
}

function imageGen() {
    $("<figure>").append(
        $("<img>").attr({
            //! these are temporary variables for setup
            "src" : imgStill,
            "data-value": "still",
            "data-still" : imgStill,
            "data-animate" : imgAnimate
        }),
        $("<figcaption>").text(`Content rating: ${tempRating}`)
    );
}

function queryAPI() {
    // ? Ajax incoming
    $.ajax({
        url : queryURL,
        method : "GET"
    }).then( function(response) {
        var queryResult = response;

        for(let i = 0; i < )
        imgStill = response.data[i].images.original_still.url;

    });
}

// // ToDo: Create an array of starter topics

// ToDo: Get input to add a new topic button

// ToDo: set up an ajax
// ToDo: Create a variable for the api url and search topic

// Functions 
// // ToDo: make something to generate and append the buttons

// ToDo: print 10 gif thumbnails to the page

// ToDo: Show gif PG rating (better make it look nice)

// ToDo: make gif start/stop running on click;
// ToDO: make gif start on hover 

// ToDo: make it so you can scroll down and get 10 more gifs


/**
 * ! Bonus
 * * Add a persistent favorites section (possibly with cookies)
 * * Make this responsive
 * * Integrate with other APIs
 */