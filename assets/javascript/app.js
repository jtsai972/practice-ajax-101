var topics = ["puppies", "kitties", "baby bunnies", "ducklings", "puppy", "kitty", "bunnies", "hamster", "cats", "dogs", "corgis", "red pandas", "quokka", "cute", "cute animals", "baby animals", "adorable animals"];
//
var str, imgStill, imgAnimate;

var favCookie;

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


// var img = $(this);
// var state = img.attr("data-state");

// state = (state === "still") ?
// 	img.attr({src : img.attr("data-animate"), "data-state" : "animate"}) :
// 	img.attr({src : img.attr("data-still", "data-state" : "still")})

//Do this after page loads
$(document).ready(function () {
    $("#search button").on("click", function() {
        event.preventDefault();
        console.log("submitted");
        
        var queryNew = $("input").val();
        console.log(queryNew);

        buttonGen(queryNew);

        $('#search form').trigger("reset");
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

    $("#images").on("click", "figure", function() {
        console.log("image click");

        var img = $(this).find("img");
        //console.log(img);

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
    })

    // Image Mouseover
    $("#images").on("mouseover", "figure", function() {
        console.log("mouse over");

        var img = $(this).find("img");

        img.attr({
            "src": img.attr("data-animate"), 
            "data-state": "animate"
        });
    })

    // Image Mouseout
    $("#images").on("mouseout", "figure", function() {
        console.log("mouse out");

        var img = $(this).find("img");

        img.attr({
            "src": img.attr("data-still"), 
            "data-state": "still"
        });
    })
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

    btnContainer.append(newButton);

    /* if ((buttonCollapse === false) && (btnContainer.height() > 200)) {
        buttonCollapse == true;
        btnContainer.addClass("collapse");
        $("#buttons .more").removeClass("collapse");
    } */
}

function imageGen() {
    var figure = $("<figure>").append(
        $("<button class='fav'>").append(
            "<i class='fas fa-star'>",
            "<i class='far fa-star'>"
        ),
        $("<img>").attr({
            "src" : imgStill,
            "data-state" : "still",
            "data-still" : imgStill,
            "data-animate" : imgAnimate
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