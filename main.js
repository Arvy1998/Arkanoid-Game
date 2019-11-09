const canvasWidth = 1521;
const canvasHeight = 720;
const ballRadioLength = 25;
let ballXPosition = 50;
let ballYPosition = 50;
let ballXAxisSpeed = 5;
let ballYAxisSpeed = 5;
let padWidth = 150;
let padHeight = 5;
let padXPossition = (canvasWidth / 2) - (padWidth / 2);
let padYPossition = canvasHeight - 25;

void setup() {
    size(canvasWidth, canvasHeight);
};

void draw() {
   background(0, 0, 0);
   bounceBall();

   drawPad();

   ballXPosition = ballXPosition + ballXAxisSpeed;
   ballYPosition = ballYPosition + ballYAxisSpeed;
};

const bounceBall = function() {
    ellipse(ballXPosition, ballYPosition, ballRadioLength, ballRadioLength);

    if ((ballXPosition + ballRadioLength >= canvasWidth) || (ballXPosition - ballRadioLength <= 0)) {
        ballXAxisSpeed = ballXAxisSpeed * -1;
    }

    if ((ballYPosition + ballRadioLength >= canvasHeight) || (ballYPosition - ballRadioLength <= 0)) {
        ballYAxisSpeed = ballYAxisSpeed * -1;
    }
}

const drawPad = function() {
    rect(mouseX - padWidth / 2, padYPossition, padWidth, padHeight);
}