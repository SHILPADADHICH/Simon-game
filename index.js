var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence() {

    level++;

    
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);


    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


    playSound(randomChosenColor);

    
    userClickedPattern = [];
}


function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}


function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel) {
   
    var lastAnswerIndex = userClickedPattern.length - 1;

    
    if (userClickedPattern[lastAnswerIndex] === gamePattern[lastAnswerIndex]) {
        console.log("success");

      
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
        
        
    }
}
function gameOver() {
    
    playSound("wrong");

    
    $("body").addClass("game-over");

  
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

  
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("h1").text("Game Over, Press Any Key to Restart");

  
    $(document).keypress(function() {
        if (level === 0) {  
            $("h1").text("Level " + level);
            nextSequence();
        }
    });
}



$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

  
    $("#" + userChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
    playSound(userChosenColour);


    checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function() {
    $("h1").text("Level " + level); 
    nextSequence();
});
