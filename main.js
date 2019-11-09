const canvasWidth = 1520;
const canvasHeight = 720;
const ballRadioLength = 24;
let ballXPosition = 500;
let ballYPosition = 300;
let ballXAxisSpeed = 6;
let ballYAxisSpeed = 6;
let padWidth = 150;
let padHeight = 5;
let padXPossition = (canvasWidth / 2) - (padWidth / 2);
let padYPossition = canvasHeight - 25;
let brickHeight = 30;
let numberOfBricksRows = 12;
let brickWidth = (canvasWidth / numberOfBricksRows);
let numberOfBricksCollumns = 4;
let brickMap;

void setup() {
    size(canvasWidth, canvasHeight);
    initBrickMap();
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
    if (ballYPosition + ballRadioLength / 2 > canvasHeight) {
        return true;
    }
    return false;
}

const isBallHitCeiling = function() {
    if ((ballYPosition - ballRadioLength / 2 <= 0)
    || (ballYPosition + ballRadioLength / 2 >= canvasHeight)) {
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
        if (confirm('Game Over!')) {
            window.location.reload();
        } 
    }

    if (isBallHitCeiling()) {
        ballXAxisSpeed = ballXAxisSpeed * -1;
    }
}

const controlPad = function() {
    if (isBallHitPad()) {
        ballYAxisSpeed = ballYAxisSpeed * -1;
        controlBallSpeed();
    }
}

const controlBallSpeed = function() {
    if (ballYPosition + ballRadioLength < padWidth / 3) {
        ballYAxisSpeed = -7;
    } else if ((ballYPosition + ballRadioLength > padWidth / 3)
        && (ballYPosition + ballRadioLength < padWidth / 2)) {
        ballYAxisSpeed = -5;  
    } else ballYAxisSpeed = -7;
}

const drawBricks = function() {
    for (let i = 0; i < numberOfBricksRows; i++) {
        for (let j = 0; j < numberOfBricksCollumns; j++) {
            placeAndHideBricks(i, j);
        }
    }
}

const placeAndHideBricks = function(i, j) {
    if (brickMap[i][j] === true) {
        if ((ballXPosition + ballRadioLength / 2 >= brickWidth * i)
          && (ballXPosition + ballRadioLength / 2 <= brickWidth * (i + 1))
          && (ballYPosition + ballRadioLength / 2 >= brickHeight * j)
          && (ballYPosition + ballRadioLength / 2 <= brickHeight * (j + 1))) {
            ballYAxisSpeed = ballYAxisSpeed * -1;
            brickMap[i][j] = false;
        } else {
            fill(0, 255, 0);
            rect((brickWidth * i), (brickHeight * j), brickWidth - 1, brickHeight - 1);
        }
    }
}

const initBrickMap = function() {
    let matrix = createMatrix(numberOfBricksRows, numberOfBricksCollumns);
    for (let i = 0; i < numberOfBricksRows; i++) {
        for (let j = 0; j < numberOfBricksCollumns; j++) {
            matrix[i][j] = true;
        }
    }
    brickMap = matrix;
}

const createMatrix = function(rows, columns) {
    let emptyMatrix = new Array(rows).fill(null);
    for (let i = 0; i < rows; i++) {
        emptyMatrix[i] = new Array(columns).fill(null);
    }
    return emptyMatrix;
}
