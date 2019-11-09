const canvasWidth = 1521;
const canvasHeight = 720;
const ballRadioLength = 24;
let ballXPosition = 50;
let ballYPosition = 50;
let ballXAxisSpeed = 5;
let ballYAxisSpeed = 5;
let padWidth = 150;
let padHeight = 5;
let padXPossition = (canvasWidth / 2) - (padWidth / 2);
let padYPossition = canvasHeight - 25;
let brickWidth = 100;
let brickHeight = 30;
let numberOfBricksRows = 15;
let numberOfBricksCollumns = 4;

void setup() {
    size(canvasWidth, canvasHeight);
};

void draw() {
   background(0, 0, 0);
   drawBall();
   drawPad();
   drawBricks();
   ballXPosition = ballXPosition + ballXAxisSpeed;
   ballYPosition = ballYPosition + ballYAxisSpeed;
};

const drawBall = function() {
    fill(0, 255, 0);
    ellipse(ballXPosition, ballYPosition, ballRadioLength, ballRadioLength);
    controlBall();
}

const drawPad = function() {
    fill(0, 255, 0);
    rect(mouseX - padWidth / 2, padYPossition, padWidth, padHeight);
    controlPad();
}

const isBallHitPad = function() {
    if ((ballYPosition + ballRadioLength / 2 >= padYPossition)
     && (ballXPosition + ballRadioLength / 2 > mouseX - padWidth / 2)
     && (ballXPosition - ballRadioLength / 2 < mouseX + padWidth / 2))  {
        return true;
    }
    return false;
}

const isBallHitFloor = function() {
    if ((ballYPosition + ballRadioLength / 2 >= canvasHeight)
     || (ballYPosition - ballRadioLength / 2 <= 0)) {
        return true;
    }
    return false;
}

const isBallHitWall = function() {
    if ((ballXPosition + ballRadioLength / 2 >= canvasWidth)
     || (ballXPosition - ballRadioLength / 2 <= 0)) {
        return true;
    }
    return false;
}

const controlBall = function() {
    if (isBallHitWall()) {
        ballXAxisSpeed = ballXAxisSpeed * -1;
    }

    if (isBallHitFloor()) {
        ballYAxisSpeed = ballYAxisSpeed * -1;
    }
}

const controlPad = function() {
    if (isBallHitPad()) {
        ballYAxisSpeed = ballYAxisSpeed * -1;
    }
}

const drawBricks = function() {
    for (let i = 0; i < numberOfBricksRows; i++) {
        for (let j = 0; j < numberOfBricksCollumns; j++) {
            fill(0, 255, 0);
            rect((brickWidth * i) + 6, (brickHeight * j) + 6, brickWidth, brickHeight);
        }
    }

    controlBricks();
}

const controlBricks = function() {

}