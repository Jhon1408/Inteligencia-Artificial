let cells = []
let newCells = []
let size = 800
let gridValue = 32
let cutSize = size/gridValue
let button;

function setup() {
    createCanvas(size+1, size+1)
    button = createButton('click me');
    button.position(19, 820);
    button.mousePressed(newStep);
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize] = new Cell(i*gridValue, j*gridValue,gridValue,i + j*cutSize)
        }
    }
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize].addNeighbour(cells[(i+1) + j*cutSize])
            cells[i + j*cutSize].addNeighbour(cells[(i-1) + j*cutSize])
            cells[i + j*cutSize].addNeighbour(cells[i + (j+1)*cutSize])
            cells[i + j*cutSize].addNeighbour(cells[i + (j-1)*cutSize])

            cells[i + j*cutSize].addNeighbour(cells[(i+1) + (j+1)*cutSize])
            cells[i + j*cutSize].addNeighbour(cells[(i+1) + (j-1)*cutSize])
            cells[i + j*cutSize].addNeighbour(cells[(i-1) + (j+1)*cutSize])
            cells[i + j*cutSize].addNeighbour(cells[(i-1) + (j-1)*cutSize])
        }
    }
    newCells = cells
    noLoop()
}

function draw() {
    frameRate(5)
    background(0)
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize].update(newCells)
        }
    }
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize].draw()
        }
    }
    newCells = cells
}

function newStep() {
    draw()
}

function mousePressed() {
    print(floor(mouseX/size * cutSize))
    print(mouseY)
    cells[floor(mouseX/width * cutSize) + floor(mouseY/height * cutSize)*cutSize].alive = 1
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize].draw()
        }
    }
}