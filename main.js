const canvasWidth = 1520;
const canvasHeight = 720;
const ballRadioLength = 14;
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
    fill(255, 255, 255);
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
    if (ballYPosition - ballRadioLength / 2 <= 0) {
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
        ballYAxisSpeed = ballYAxisSpeed * -1;
    }
}

const controlPad = function() {
    if (isBallHitPad()) {
        ballYAxisSpeed = ballYAxisSpeed * -1;
        controlBallSpeed();
    }
}

const controlBallSpeed = function() {
    if ((ballXPosition + ballRadioLength / 2 >= mouseX - padWidth / 2)
    && (ballXPosition + ballRadioLength / 2 <= (mouseX - padWidth / 2) + padWidth / 3)) {
        ballYAxisSpeed = -6;
        ballXAxisSpeed = -5;
    } else if ((ballXPosition + ballRadioLength / 2 >= (mouseX - padWidth / 2) + padWidth / 3)
        && (ballXPosition + ballRadioLength <= (mouseX - padWidth / 2) + ((padWidth * 2) / 3))) {
        ballYAxisSpeed = -8;
        ballXAxisSpeed = -2;
    } else { 
        ballYAxisSpeed = -6;
        ballXAxisSpeed = 5;
    }
}

const drawBricks = function() {
    for (let i = 0; i < numberOfBricksRows - 1; i++) {
        for (let j = 0; j < numberOfBricksCollumns; j++) {
            placeAndHideBricks(i, j);
        }
    }
}

const placeAndHideBricks = function(i, j) {
    if (brickMap[i][j] >= 0 && brickMap[i][j] !== null) {
        if (((ballXPosition + ballRadioLength / 2 >= brickWidth * i)
          && (ballXPosition - ballRadioLength / 2 <= brickWidth * (i + 1))
          && (ballYPosition + ballRadioLength / 2 >= brickHeight * j)
          && (ballYPosition - ballRadioLength / 2 <= brickHeight * (j + 1)))
           || ((ballYPosition + ballRadioLength / 2 >= brickHeight * j)
                && (ballYPosition + ballRadioLength / 2 <= brickHeight * (j + 1))
                && (ballXPosition + ballRadioLength / 2 >= brickWidth * i)
                && (ballXPosition + ballRadioLength / 2 <= brickWidth * (i + 1)))
        ) {
            ballYAxisSpeed = ballYAxisSpeed * -1;
            brickMap[i][j]--;
        } else {
            if (brickMap[i][j] === 0) {
                fill(0, 255, 0);
                rect((brickWidth * i), (brickHeight * j), brickWidth - 1, brickHeight - 1);
            } else if (brickMap[i][j] === 1) {
                fill(0, 140, 0);
                rect((brickWidth * i), (brickHeight * j), brickWidth - 1, brickHeight - 1);
            } else if (brickMap[i][j] === 2) {
                fill(0, 90, 0);
                rect((brickWidth * i), (brickHeight * j), brickWidth - 1, brickHeight - 1);
            } else if (brickMap[i][j] === 3) {
                fill(0, 30, 0);
                rect((brickWidth * i), (brickHeight * j), brickWidth - 1, brickHeight - 1);
            }
        }
    }
}

const initBrickMap = function() {
    let matrix = createMatrix(numberOfBricksRows - 1, numberOfBricksCollumns);
    let brickLevel = 3;
    for (let i = 1; i < numberOfBricksRows - 1; i++) {
        for (let j = 1; j < numberOfBricksCollumns; j++) {
            matrix[i][j] = brickLevel;
            brickLevel--;
        }
        brickLevel = 3;
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
