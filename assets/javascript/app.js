var topics = ["puppies", "kitties", "bunnies", "ducklings", "puppy", "kitty", "hamster", "corgis", "dogs", "cats", "red pandas", "cute", "cute animals", "baby animals", "adorable animals"];
//
var str;

//API variables
var myKey = config.giphyKey; //api key

// ToDo: Properly name and set these up, these are placeholders

var queryValue = ""; //input
var printNum = 10 //

//This needs to go after the terms in it
var queryURL = "https://api.giphy.com/v1/gifs/search?q" + queryValue + "&api_key" + myKey;


//generating topics at the start
for(let i = 0; i < topics.length; i++) {
    buttonGen(topics[i]);
}

//Do this after page loads
$(document).ready(function () {
    

    
});



// ? Ajax incoming
$.ajax({
    url : queryURL,
    method : "GET"
}).then( function() {

});

// ? Welcome to functions

function buttonGen(str) {
    var newButton = $("<button>").text(str);
    $("#buttons").append(newButton);
}

function imageGen() {
    $("<figure>").append(
        $("<img>").attr({
            //! these are temporary variables for setup
            "src" : queryResult,
            "data-value": "still",
            "data-still" : thumbNail,
            "data-animate" : searchResult
        }),
        $("<figcaption>").text(`Content rating: ${tempRating}`)
    );
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