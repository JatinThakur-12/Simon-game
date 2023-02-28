let buttonColours = ["red", "blue", "green", "yellow"];
let level=0;
let userClickedPattern=[];
let gamePattern = [];
let started=false;

$("body").keypress(function (){
  if(!started){
    nextSequence();
  }
});

function nextSequence() {

  userClickedPattern=[];

  level++;
  if(level>0){
    $("#level-title").text("Level "+level);
  }
  
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//plays sound
function playSound(name){

  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//animate the pressed button
function animatePressed(currentColor){
  
  $("#"+currentColor).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColor).removeClass("pressed");
  },100);

}

//detect button click
$(".btn").click(function(){

  let userChosenColour= $(this).attr('id');
  // console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePressed(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});

//start over
function startOver(){
  gamePattern=[];
  started=false;
  level=0;
}

//Check Answer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(currentLevel+1===gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  }else{
    console.log("inside else");
    playSound("wrong");
    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press any key to restart.")
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    
    startOver();
  }
}
