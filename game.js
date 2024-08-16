
// Random pattern for the Game
var gamePattern = [];

// button
var buttonColours = ["red", "blue", "green", "yellow"];

// start the game
var level = 0;
var started = false;


// function for the game
function nextSequence() {

    // generate random number
    var randomNumber = Math.floor(Math.random()*4);
    // change number into colour
    var randomChosenColour = buttonColours[randomNumber];
    // push the colour to game Pattern
    gamePattern.push(randomChosenColour);
    // Animation 
    $("#" + gamePattern[gamePattern.length - 1]).fadeOut(100).fadeIn(100);
    // Play sound
    playSound(randomChosenColour);
    // Change H1
    $("#level-title").text("Level "+ level);
    // add number of the level
    level++;
    $("#level-title").text("Level "+ level);
    
    while(userClickedPattern.length > 0){
    userClickedPattern.pop();
    }

}


// User input if they pressed the button
var userClickedPattern = [];

$(".btn").on("click", function (event){
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePressed(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

// Playing sound
function playSound(name) {

    var audioOut = new Audio("./sounds/" + name + ".mp3");
    audioOut.play();
}


// Animation of the button
function animatePressed(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function (){
    $("." + currentColour).removeClass("pressed");} , 100);
    
}

// Pressed Enter & Play the game
$("body").keydown(function (e){

    if(e.key == "Enter" && started === false){
        nextSequence();
        started = !started;

    } else{
    }
})

// Function to check if the answer is correct
function checkAnswer(currentLevel){
    // check last index of the array
    if( userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        // check if the length of array already the same
        if(userClickedPattern.length == gamePattern.length){
            // Continue the Game
            setTimeout(function () {
            nextSequence(); } ,1000)
        }

    }else{
        // If the answer wrong
        playSound("wrong");
        $("#level-title").text("Game Over, Press Enter to Restart.");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over"); }, 200)

        startOver();
    }
}

// restart the game
function startOver() {
    level = 0;
    started = !started;
    gamePattern.pop();

}