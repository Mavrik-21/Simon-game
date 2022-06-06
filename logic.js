
var colors = ["red","green","blue","yellow"];

var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    console.log("clicked");
    var userClickedPattern = this.id;
    userPattern.push(userClickedPattern);
    playSound(userClickedPattern);
    animatePress(userClickedPattern);
    checkAnswer(userPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userPattern[currentLevel]){
        if(gamePattern.length===userPattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
      playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function nextSequence(){
    
    userPattern = [];
    level++;

    $("h1").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = colors[randomNumber];
    
    gamePattern.push(randomColor);

    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
  var audio = new Audio("sound/"+name+".mp3");
  audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}

