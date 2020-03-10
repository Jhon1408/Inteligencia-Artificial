let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let players = ['O','X'];
let available = [];
let currentPlayer;

function setup() {
    var cnv = createCanvas(400, 400);
    background(220);
    currentPlayer = random(players);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            available.push([i,j]);
        }
    }
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function nextTurn() {
    let index = floor(random(available.length));
    let spot = available.splice(index,1)[0];
    let i = spot[0];
    let j = spot[1];
    board[i][j] = currentPlayer;
    if(currentPlayer == 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    
}

function mousePressed() {
    nextTurn();
}

function drawBottom(w,h) {
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
            let w = width/3;
            let h = height/3;
            let x = w * i + w/2;
            let y = h * j + h/2;
            let S = board[i][j];
            drawBottom(w,h);
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