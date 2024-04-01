var cvs = document.getElementById("mycanvas");
var ctx = cvs.getContext("2d");

// Loading the Images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBelow = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeUp.src = "images/pipeUp.png";
pipeBelow.src = "images/pipeBelow.png";

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// Loading the Audio Files

var fly_audio = new Audio();
var score_audio = new Audio();

fly_audio.src = "sounds/fly.mp3";
score_audio.src = "sounds/score.mp3";

// Adding Event Listener for Key Pressing

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 25;
    fly_audio.play();
}

// Pipe Initial Coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// Drawing Images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeUp.height+gap;
        ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeBelow,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;
        
        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeUp.height*0.6-pipeUp.height*0.6)
            });
        }

        // Detecting Collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeUp.width && (bY <= pipe[i].y + pipeUp.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // Reloading the Page
        }
        
        if(pipe[i].x+pipeUp.width == 10){
            score++;
            score_audio.play();
        }
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    ctx.drawImage(bird,bX,bY);
    bY += gravity;
    ctx.fillStyle = "Teal";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw();
