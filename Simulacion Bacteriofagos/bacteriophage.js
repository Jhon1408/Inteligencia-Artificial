class bacteriophage {
    constructor(posX, posY) {
        this.posX = posX
        this.posY = posY
        this.velX = 0
        this.velY = 0
        this.size = 10
    }

    draw() {
        stroke(255,255,0)
        fill(255,0,0)
        rectMode(CENTER)
        rect(this.posX, this.posY, this.size, this.size)
        this.posX = this.posX + this.velX
        this.posY = this.posY + this.velY
    }

    search(bacteriaList) {
        let distance = Infinity
        let bestBacteria = null
        for (let i = 0; i < bacteriaList.length; i++) {
            let currentBacteria = bacteriaList[i];
            if(currentBacteria.state != "DEAD" && currentBacteria.state != "INFECTED") {
            let CurrentDistance = this.getBacteriaDistance(currentBacteria)
                if(CurrentDistance < distance) {
                    distance = CurrentDistance
                    bestBacteria = currentBacteria
                }
            }
        }
        return bestBacteria
    }

    getBacteriaDistance(bacteria) {
        let x = bacteria.posX - this.posX
        let y = bacteria.posY - this.posY 
        let distance = sqrt(sq(x)+sq(y))
        return distance
    }

    drawRaycasting(bacteriaList) {
        for (let i = 0; i < bacteriaList.length; i++) {
            let currentBacteria = bacteriaList[i];
            if(currentBacteria.state != "DEAD" && currentBacteria.state != "INFECTED") {
                rectMode(CENTER)
                stroke(255)
                line(this.posX, this.posY, currentBacteria.posX, currentBacteria.posY)
            }
        }
    }

    attack(bacteria,bacteriophageList) {
        if(bacteria.state != "DEAD" && bacteria.state != "INFECTED") {
            rectMode(CENTER)
            stroke(0,255,0)
            line(this.posX, this.posY, bacteria.posX, bacteria.posY)
            let angle = atan2(bacteria.posY - this.posY,bacteria.posX - this.posX)
            let magnitude = 1.0;
            this.velX = Math.cos(angle) * magnitude;
            this.velY = Math.sin(angle) * magnitude;
            if((this.posY - this.size) >= (bacteria.posY - bacteria.size) && (this.posY + this.size) <= (bacteria.posY + bacteria.size) && (this.posX - this.size) >= (bacteria.posX - bacteria.size) && (this.posX + this.size) <= (bacteria.posX + bacteria.size)) {
                //print("Bacteria found: ", bacteria)
                if(bacteria.state == "NEUTRAL") {
                    bacteria.changeState("INFECTED")
                    this.velX = 0
                    this.velY = 0
                } else if(bacteria.state == "PROTECTED") {
                    let index = bacteriophageList.indexOf(this)
                    this.velX = 0
                    this.velY = 0
                    bacteriophageList.splice(index, 1)
                    bacteria.lifetime = (bacteria.lifetime / 2)
                }
            }
        }
    }
}