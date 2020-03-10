let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let players = ['O','X'];
let human = '';
let ia = '';
let available = [];
let currentPlayer;
let w = 0;
let h = 0;

function setup() {
    var cnv = createCanvas(400, 400);
    background(220);
    human = random(players);
    if (human == 'X') {
        ia = 'O';
    } else {
        ia = 'X';
    }
    print(human)
    print(ia)
    currentPlayer = human;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            available.push([i,j]);
        }
    }
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
    w = width/3;
    h = height/3;
}



function nextTurn() {
    let available = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] == '') {
                available.push({i, j});
            }
        }
    }
    let move = random(available);
    board[move.i][move.j] = ia;
    currentPlayer = human;
}

function mousePressed() {
    if(currentPlayer == human) {
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        if(board[i][j] == '') {
            board[i][j] = human;
            currentPlayer = ia;
            nextTurn();
        }
    }
    
}

function drawBottom() {
    stroke(0);  
    line(w, 0, w, height);
    line(w*2, 0, w*2, height);
    line(0, h, width, h);
    line(0, h*2, width, h*2);
    line(0, 0, 0, height);
    line(0, 0, width, 0);
    line(0, height-1, width, height-1);
    line(width-1, 0, width-1, height);
}

function draw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * i + w/2;
            let y = h * j + h/2;
            let S = board[i][j];
            drawBottom();
            if(S == players[0]) {
                noFill();
                ellipseMode(CENTER);
                stroke(0,0,255);
                ellipse(x, y, w/2)
            } else if(S == players[1]) {
                let xr = w/4;9
                stroke(255,0,0);
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }
        }
    }
}