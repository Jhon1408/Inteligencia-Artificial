class Cell {
    constructor(posX, posY, size, pos) {
        this.neighbours = []
        this.posX = posX
        this.posY = posY
        this.size = size
        this.alive = 0
        this.aliveNeighbours = 0
        this.color = color(255)
        this.pos = pos
    }

    addNeighbour(neighbour) {
        this.neighbours.push(neighbour)
    }

    changeColor(newColor) {
        this.color = newColor
    }

    update(cells) {
        this.aliveNeighbours = 0
        for (let i = 0; i < cells[this.pos].neighbours.length; i++) {
            if(cells[this.pos].neighbours[i] != undefined) {
                if(cells[this.pos].neighbours[i].alive == 1) {
                    this.aliveNeighbours += 1
                }
            } 
        }
        if (this.alive == 0) {
            if (this.aliveNeighbours == 3) {
                this.alive = 1
            }
        }
        if (this.alive == 1) {
            if (this.aliveNeighbours <= 2) {
                this.alive = 0
            }
            if (this.aliveNeighbours >= 4) {
                this.alive = 0
            }
        }
    } 

    showNeighbours() {
        for (let i = 0; i < this.neighbours.length; i++) {
            if(this.neighbours[i] != undefined) {
                this.neighbours[i].changeColor(color(0,255,0))
            } 
        }
    }

    draw() {
        if(this.alive == 0) {
            this.color = color(255)
        } else {
            this.color = color(0)
        }
        fill(this.color)
        rect(this.posX, this.posY, this.size, this.size)
    }
}