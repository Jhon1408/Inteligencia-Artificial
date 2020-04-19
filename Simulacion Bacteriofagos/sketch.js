let bacteriasList = []
let bacteriophageList = []
let bacterias = 50
let bestBacteria
let WIDTH = 800
let HEIGHT = 800

function setup() {
    createCanvas(WIDTH, HEIGHT);
    for (let i = 0; i < bacterias; i++) {
        bacteriasList[i] = new Bacteria(random(20, WIDTH-20),random(20, HEIGHT-20))
    }

    bacteriophageList.push(new bacteriophage(WIDTH/2,HEIGHT/2))
}

function mousePressed() {
    bacteriasList.push(new Bacteria(mouseX,mouseY))
}

function draw() {
    background(0)
    if(bacteriasList.length > 0) {
        for (let i = 0; i < bacteriasList.length; i++) {
            if(bacteriasList[i] != null) {
               if(bacteriasList[i].state == "INFECTED") {
                    bacteriasList[i].lifetime = bacteriasList[i].lifetime - 1
                }
                bacteriasList[i].draw()
                bacteriasList[i].updateBacteria(bacteriasList,bacteriophageList)
            }
        }
    }
    if(bacteriophageList.length > 0) {
        for (let j = 0; j < bacteriophageList.length; j++) {
            bacteriophageList[j].draw()
        }
        if(bacteriasList.length > 0) {
            for (let i = 0; i < bacteriophageList.length; i++) {
                bacteriophageList[i].drawRaycasting(bacteriasList)
                bestBacteria = bacteriophageList[i].search(bacteriasList)
                if(bestBacteria != null) {
                    bacteriophageList[i].attack(bestBacteria,bacteriophageList)
                }
            }
        }
    }
}