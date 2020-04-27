class Cell {
    constructor(posX, posY, size) {
        this.neighbours = []
        this.color = color(random(50,255))
        this.posX = posX
        this.posY = posY
        this.size = size
        this.material = "inert"
    }

    isInert() {
        if (this.material = "inert")
            return true
        else
            return false
    }

    addNeighbour(neighbour) {
        this.neighbours.push(neighbour)
    }

    changeColor(newColor) {
        this.color = newColor
    }

    showNeighbours() {
        for (let i = 0; i < this.neighbours.length; i++) {
            if(this.neighbours[i] != undefined) {
                this.neighbours[i].changeColor(color(0,255,0))
            }
            
        }
    }

    draw() {
        fill(this.color)
        rect(this.posX, this.posY, this.size, this.size)
    }
}