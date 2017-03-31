// Cross browser support
function addEvent(object, evName, fnName, cap) {
    if (object.attachEvent)
        object.attachEvent("on" + evName, fnName);
    else if (object.addEventListener)
        object.addEventListener(evName, fnName, cap);
}

// Load game
addEvent(window, "load", loadGame, false);

// Game variables
var generatedRandom;
var guess;
var fromOne;
var toOne;
var guessAttempts = 0;

// Load the game, set the focus to the from box, set the start
// start button to run the game
function loadGame() {
    document.getElementById("from").focus();
    document.getElementById("start").onclick = runGame;
}

// The run game function parses integers from the from and to boxes
// I set a test so that from must be less than to, to avoid complications
// The next test makes sure both inputs contain integers before allowing
// the game to continue. If the input numbers are not valid, focused is returned
// to the from box and values are cleared. When things
// are good focus is shifted to the guess input box. checkGuess function is added to the guess button onclick.
function runGame() {
    fromOne = parseInt(document.getElementById("from").value);
    toOne = parseInt(document.getElementById("to").value);

    if (fromOne > toOne) {
        alert("Your from value must be greater than your to value");
        document.getElementById("from").value = "";
        document.getElementById("to").value = "";
        document.getElementById("from").focus();
        return;
    }

    if ((!isNaN(fromOne)) && (!isNaN(toOne))) {
        generatedRandom = genRand(fromOne, toOne);
        document.getElementById("guessbox").focus();
        document.getElementById("instruc").value = "Please guess a number, enter it, and press Guess.";
    } else {
        alert("You must enter valid numbers.");
        document.getElementById("from").value = "";
        document.getElementById("to").value = "";
        document.getElementById("from").focus();
    }

    document.getElementById("guess").onclick = checkGuess;


}

// return a random number within a range
function genRand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Grabs an integer from the guess box. If you didn't enter an integer,
// guess is cleared and focus stays with it, the same correction happens if 
// you enter a number out of the range. If the guess is valid, The numbers that 
// you guessed are stored at the bottom. The game tells you if you need to increase
// or decrease your guess. When you get it, you are told how many tries it took.
function checkGuess() {
    guess = parseInt(document.getElementById("guessbox").value);

    if (isNaN(guess)) {
        alert("You must enter a valid number for the guess");
        document.getElementById("guessbox").value = "";
        document.getElementById("guessbox").focus();
        return;
    }

    if (guess < fromOne || guess > toOne) {
        alert("The number you entered is not in the From-To range. Please enter a valid number.");
        document.getElementById("guessbox").value = "";
        document.getElementById("guessbox").focus();
        return;
    }

    if (document.getElementById("result").value == "") {
        document.getElementById("result").value = "Number(s) Guessed:";
    }

    if (generatedRandom > guess) {
        document.getElementById("instruc").value = "My number is greater than " + guess;
        document.getElementById("guessbox").value = "";
        document.getElementById("guessbox").focus();
        guessAttempts += 1;
        document.getElementById("result").value += " " + guess;
    }
    else if (generatedRandom < guess) {
        document.getElementById("instruc").value = "My number is less than " + guess;
        document.getElementById("guessbox").value = "";
        document.getElementById("guessbox").focus();
        guessAttempts += 1;
        document.getElementById("result").value += " " + guess;
    }
    else {
        guessAttempts += 1;
        document.getElementById("instruc").value = "Please set range of numbers and press the Start button.";
        document.getElementById("from").value = "";
        document.getElementById("to").value = "";
        document.getElementById("guessbox").value = "";
        document.getElementById("result").value = "";
        alert("Correct! It took you " + guessAttempts + " attempts to guess this number.");
        document.getElementById("from").focus();
    }
}