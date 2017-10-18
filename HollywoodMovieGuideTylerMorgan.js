/**
 * @author Morgan, Tyler (morgant@student.ncmich.edu)
 * @version 1
 * @summary Tyler Morgan's Project 3 || created: 10.15.2017
 */

/** This is the pragma and library call section of the program*/
"use strict";
const PROMPT = require('readline-sync');

/** This is the global factor section of the program*/
let rating,ratingAverage, failedTries; //sets rating, ratingAverage, and failedTries as variables
let movieTitle, continueResponse; //sets movieTitle and continueResponse as variables
const MIN_RATING = 0, MAX_RATING = 5; //sets MIN_RATING and MAX_RATING as global factors

/** This section contains the dispatch method of the program*/
function main () { //declares main as the dispatch method
    process.stdout.write('\x1Bc'); //Clears the screen
    if (continueResponse == null) { //program begins here as continueResponse starts with a null value
        setContinueResponse(); //runs continueResponse function
        setMovieTitle(); //runs movieTitle function
        setFailedTries(); //runs failedTries function
    }
    if (continueResponse === 1) { //if the user accepts the prompt to continue responding or if it's the first loop, the rating function begins
        setStartRating();
        return main();
    }
    if (failedTries>3) { //
        setErrorEnding();
    }
    setRatingAverage();
}

/** This is the mutator and utility section of the program*/
main(); //main function calls to the following section

function setContinueResponse() { //the setContinueResponse function prompts the user if they want to continue responding after their first rating
    if (continueResponse === 1) {
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? (1=yes, 0=no): `));
        if (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = 1;
            setContinueResponse();
        }
    }
    else { //line 46 and 47 set the continueResponse function to prompt the user after it is called for after the initial loop
        continueResponse = 1;
    }
}

function setMovieTitle() { //prompts the user to enter the title of the movie they are reviewing
    movieTitle = PROMPT.question(`\nPlease enter the name of the movie you are reviewing: `);
}

function setFailedTries() { //sets failedTries = 0 for when it'll potentially get modified in the startRating function
    Number(failedTries = 0);
}

function setStartRating() { //prompts the user for what they want to rate the movie and sets up a failedTries value for incorrectly submitted responses
    if (failedTries <= 3) {
        rating = Number(PROMPT.question(`\nPlease enter the amount of stars between 0 and 5 that you'd like to give the movie "${movieTitle}": `));
        if (rating >= MIN_RATING && rating <= MAX_RATING) { //sets parameters for what rating has to be
            setContinueResponse();
        } else {
            process.stdout.write('\nThat value is invalid. Please enter a correct value.');
            failedTries++;
            setStartRating();
        }
    }
    if (failedTries > 3) { //sets continueResponse to 0 and loops back to main so the failedTries if statement can run
        continueResponse = 0;
        return main();
    }
}

function setErrorEnding() { //beings error ending if loop is broken by too many user-inputted errors
    console.log('\nIm sorry, but you have entered an incorrect value too many times. Restart to try again.');
}

function setRatingAverage() { //displays a randomized average rating for whatever movie was entered by the user in the movieTitle function
    ratingAverage=Math.floor((Math.random() * 5) + 1);
    console.log(`\nThe average rating for the movie "${movieTitle}" is ${ratingAverage}.`);
}

