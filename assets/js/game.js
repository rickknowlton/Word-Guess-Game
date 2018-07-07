//------------------------------------------//
//              Game Variables              //
//------------------------------------------//
// Global variables are defined, including  //
// an empty array to catch wrong guesses    //
// and our preset game status values.       //
//------------------------------------------//


var word;
var magicWord;
var wordArray;
var wrongLetters = [];
var wrong = 0;
var guesses = 12;
var wins = 0;
var losses = 0;
var gameOn;
var winning = false;
var losing = false;


//------------------------------------------//
//               Load Welcome               //
//------------------------------------------//
// This simply hides our "game" window from //
// the user as they come to our page.       //
//------------------------------------------//

$('#game').hide();


//------------------------------------------//
//             Win/Loss Actions             //
//------------------------------------------//
// When a win or loss is triggered, these   //
// functions are designed to display an     //
// alert message in the form of a slider.   //
// It shows the user the correct word, the  //
// amount of guesses used and of course if  //
// they won or lost.                        //
//------------------------------------------//

function gameWin() {
    gameOn = false;
    winning = true;
    wins += 1;
    var taken = 12 - guesses;
    $('#wins').html(wins);
    $('#winner').html("<div class='win-display my-4'> <div class='win-slider'> <div class='row win-slider-header'> <div class='col-lg-12'> <div class='card'> <div class='card-header'> <h1>Winner!</h1> </div> <div class='card-body'> <h2>You guessed the word correctly.</h2> <h3>Magic Word: <span id='currentWord'>" + magicWord.word + "</span> </h3> <h3>Guesses: <span id='currentWord'>" + taken + "</span> </h3> </div> <div class='card-footer'> <div class='row'> <div class='col-lg-12'> <p class='card-footer-text'>Press any key to continue...</p> </div> </div> </div> </div> </div> </div> </div> </div>");
    $('#winner').slideDown("slow");
}

function gameOver() {
    gameOn = false;
    losing = true;
    losses += 1;
    var taken = 12 - guesses;
    $('#loss').html(losses);
    $('#loser').html("<div class='loss-display my-4'> <div class='loss-slider'> <div class='row loss-slider-header'> <div class='col-lg-12'> <div class='card'> <div class='card-header'> <h1>You lost!</h1> </div> <div class='card-body'> <h2>You guessed the word incorrectly.</h2> <h3>Magic Word: <span id='currentWord'>" + magicWord.word + "</span> </h3> <h3>Guesses: <span id='currentWord'>" + taken + "</span> </h3> </div> <div class='card-footer'> <div class='row'> <div class='col-lg-12'> <p class='card-footer-text'>Press any key to continue...</p> </div> </div> </div> </div> </div> </div> </div> </div>");
    $('#loser').slideDown("slow");
}

//------------------------------------------//
//                Game Reset                //
//------------------------------------------//

function gameReset() {
    guesses = 12;
    $('#game').show();
    $('#guesses').html(guesses);
    $('#letters-word').html('');
    $('#letters-guessed').html('');
    gameInit();
}

//------------------------------------------//
//             Initialize Game              //
//------------------------------------------//
// In this section, we'll begin our game.   //
// First we'll declare variables, each with //
// it's default status. Next, we'll declare //
// a series of variables to grab our word   //
// randomly from our word bank, split the   //
// the word into individual characters, and //
// then create spaces that matches the our  //
// word length.                             //
//------------------------------------------//

function gameInit() {
    gameOn = true;
    winning = false;
    losing = false;

    
    word = grabWord();
    wordArray = grabWordArray();
    magicWord = {
        word: word,
        wordArray: wordArray
    };

    function grabWord() {
        const wordBank = ['Miner', 'Fasten', 'Thirsty', 'Pale', 'Face', 'Resonant', 'Basketball', 'Screwdriver', 'Gruesome', 'Liquid', 'Octothorp', 'Connect'];
        const randIndex = Math.floor(Math.random() * wordBank.length);
        const randWord = wordBank[randIndex];
        return randWord;
    }

    function grabWordArray() {
        let splitWordArray = word.split('');
        return splitWordArray;
    }

    showSpaces();
}

function showSpaces() {
    for (i = 0; i < magicWord.wordArray.length; i++) {
        $('#letters-word').append('<span id=letter-space' + i + '>_</span>');
    }
}

//------------------------------------------//
//              Game Mechanics              //
//------------------------------------------//
// Here we define our game mechanics; how a //
// letter is captured from the user, if it  //
// matches the letters in the word pulled   //
// from the array, if there are any guesses //
// remaining, and what's required for the   //
// user to win or lose.                     //
//------------------------------------------//

function showLetter(letter, letterLocation) {
    $('#letter-space' + letterLocation).html(letter);

    var currentWord = $('#letters-word').text();
    if (currentWord == magicWord.word) {
        gameWin();
    }
}

function wrongKey(letter) {
    var letterGuessed = $('#wrong-' + letter).text().indexOf(letter) > -1;
    if (wrongLetters.includes(letter) && !letterGuessed) {
        guesses--;
        $('#letters-guessed').append('<span id=wrong-' + letter + '>' + letter + ' </span>');
        $('#guesses').html(guesses);

        if (guesses === 0) {
            gameOver();
        }
    }
}

function checkWrong(letter) {
    if (wrong == magicWord.wordArray.length) {
        wrongLetters.push(letter);
        wrongKey(letter);
    }
}

document.onkeyup = function (event) {
    if (gameOn) {
        var input = String.fromCharCode(event.keyCode).toLowerCase();

        for (let i = 0; i < magicWord.wordArray.length; i++) {
            if (input === magicWord.wordArray[i].toLowerCase()) {
                showLetter(magicWord.wordArray[i], i);
                wrong = 0;
            } else {
                wrong = wrong + 1;
                checkWrong(input);
            }
            if (i === magicWord.wordArray.length - 1) {
                wrong = 0;
            }
        }
    } else if (!gameOn) {
        if (winning) {
            $('#winner').slideUp("slow", gameReset());
        } else if (losing) {
            $('#loser').slideUp("slow", gameReset());
        } else if (!winning) {
            $('#welcome').slideUp("slow", gameReset());
        }
    }
}