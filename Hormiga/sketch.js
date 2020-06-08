let size = 600
let grid = 150
let gridSize = size/grid
let hormiga = []
let cells = []

function setup() {
    createCanvas(600, 600)
    hormiga[0] = size/2
    hormiga[1] = size/2
    hormiga[2] = 0
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            cells[i + j * grid] = 0
        }
    }
}

function draw() {
    background(255)
    for (let i = 0; i < grid; i++) {
        for (let j = 0; j < grid; j++) {
            if(cells[i + j * grid] == 0) {
                stroke(0)
                noFill()
                rect((i + gridSize), (j + gridSize), gridSize, gridSize)
            } else {
                fill(0)
                rect((i + gridSize), (j + gridSize), gridSize, gridSize)
            }
            
        }
    }
    fill(0)
    rect(hormiga[0], hormiga[1], gridSize, gridSize)
}