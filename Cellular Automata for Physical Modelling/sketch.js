let cells = []
let size = 800
let gridValue = 32
let cutSize = size/gridValue

function setup() {
    createCanvas(size, size)
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize] = new Cell(i*gridValue, j*gridValue,gridValue/2)
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
    cells[1].showNeighbours()
}

function draw() {
    background(0)
    for (let i = 0; i < cutSize; i++) {
        for (let j = 0; j < cutSize; j++) {
            cells[i + j*cutSize].draw()
        }
    }
}