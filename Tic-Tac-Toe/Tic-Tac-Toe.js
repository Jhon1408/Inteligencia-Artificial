let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let human = 'O';
let ia = 'X';
let currentPlayer = human;

let w;
let h;

function setup() {
    var cnv = createCanvas(600, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    w = width/3;
    h = height/3;
    if (currentPlayer == ia) {
        bestMove();
    }
}



function equals3(a, b, c) {
    return a == b && b == c && a != '';
}

function checkWinner() {
    let winner = null;
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }

    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner == null && openSpots == 0) {
        return 'tie';
    } else {
        return winner;
    }
}

function mousePressed() {
    if(currentPlayer == human) {
        try {
            let i = floor(mouseX / w);
            let j = floor(mouseY / h);
            if(board[i][j] == '') {
                board[i][j] = human;
                currentPlayer = ia;
                bestMove();
            }
        } catch (error) {
            
        }
        
    }
    
}

function drawBottom() {
    stroke(0);  
    line(w, 0, w, height);
    line(w*2, 0, w*2, height);
    line(0, h, width, h);
    line(0, h*2, width, h*2);
    line(0 + 1, 0, 0 + 1, height);
    line(0 + 1, 0, width + 1, 0);
    line(0, height-1, width, height-1);
    line(width-1, 0, width-1, height);
}

function drawNumbers() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * i + w/2;
            let y = h * j + h/2;
            textSize(25);
            textAlign(CENTER)
            stroke(211,211,211)
            fill(211,211,211)
            strokeWeight(1);
            text("("+i+","+j+")", x, y);
            strokeWeight(4);
        }
    }
}

function draw() {
    background(255);
    let result = checkWinner();
    drawNumbers();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'tie') {
            resultP.html('Tie!');
        } else {
            resultP.html(`${result} wins!`);
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * i + w/2;
            let y = h * j + h/2;
            let spot = board[i][j];
            let xr = w/4;
            drawBottom();
            strokeWeight(4);
            if(spot == 'O') {
                noFill();
                ellipseMode(CENTER);
                stroke(0,0,255);
                ellipse(x, y, xr * 2)
            } else if(spot == 'X') {
                stroke(255,0,0);
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
        }
    }
}