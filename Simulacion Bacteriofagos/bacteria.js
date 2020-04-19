class Bacteria {
    constructor(posX, posY) {
        this.normalLife = 500
        this.lifetime = this.normalLife
        this.posX = posX
        this.posY = posY
        this.color = color(135,206,235)
        this.size = 30
        this.decay = 0.3
        //POSSIBLE STATES = NEUTRAL, PROTECTED, INFECTED AND DEAD.
        this.state = random(0, 1)
        if(this.state > 0.7) {
            this.state = "PROTECTED"
        } else {
            this.state = "NEUTRAL"
        }
    }

    draw() {
        fill(this.color)
        stroke(0,0,255)
        rectMode(CENTER)
        ellipse(this.posX, this.posY, this.size)
        this.posX = this.posX + (random(-1, 1))
        this.posY = this.posY + (random(-1, 1))
    }

    changeState(newState) {
        this.state = newState
    }

    updateBacteria(bacteriaList,bacteriophageList) {
        if(this.lifetime < 0) {
            this.state = "DEAD"
            if(random(0, 1) < 0.5) {
                bacteriophageList.push(new bacteriophage(this.posX,this.posY))
            }
        }
        if(this.state == "DEAD") {
            let index = bacteriaList.indexOf(this)
            bacteriaList.splice(index, 1)
        } else if(this.state == "INFECTED") {
            this.color = color(255,0,0)
        } else if(this.state == "PROTECTED") {
            this.color = color(0,0,240)
            if(this.lifetime < this.normalLife*this.decay) {
                this.state = "NEUTRAL"
                this.color = color(135,206,235)
            }
        }
    }
}