//Empezara a generar los parametros del mundo =>
//Funciones importantes
//<Funciones y varaibles imporantes----------------------->

console.log(dataJson)
let sizeMapX = 2000
let sizeMapY = 2000

var relativePosition = [sizeMapX/2, sizeMapY/2]
var onScreen = [[-20, -20],[screen.width + 20, screen.height + 20]]


function getObjectInArea(object, area){
    let data
    if(object.position.posX > area[0][0] && object.position.posX < area[1][0] &&
        object.position.posY > area[0][1] && object.position.posY < area[1][1]){
        data = true
    }else{
        data = false
    }

    return data
}

/*
const dataJson = {}
async function poderes(){
    try{
        const response = await fetch("./json/pix.json")
        const data = await response.json()
        dataJson = data
        return data
    } catch (error) {
        console.error("Error fetching json:", error)
    }
}

async function init(){
    let i = await poderes()
    console.log(i)
}

let a  = init(*/



function showObjectOnScreen(object){
    if(getObjectInArea(object, onScreen)){
        return true
    }else{
        return false
    }
}

function changePostionTo(object, index, op, vel){
    if(index == "x"){
        if(op == "+"){
            object.position.posX +=vel;
        }else if(op == "-"){
            object.position.posX -=vel;
        }
    }else if(index == "y"){
        if(op == "+"){
            object.position.posY +=vel;
        }else if(op == "-"){
            object.position.posY -=vel;
        }
    }
    

}

//<Movimiento del jugador a una velocidad de playerVelocity------------>

let movement_x_ON_OUT = false
let xDirection = ""
let yDirection = ""
let movement_y_ON_OUT = false

function continuesMovementON_OUT(object, velX, velY){
    if(movement_x_ON_OUT && x_or_y == "x"){
        switch(xDirection){     
            case "ArrowLeft":
            case "a":
                changePostionTo(object, "x", "-", velX)
                break;
            case "ArrowRight":
            case "d":
                changePostionTo(object, "x", "+", velX)
                break;
            }
    }
    if(movement_y_ON_OUT && x_or_y == "y"){
        switch(yDirection){ 
            case "ArrowUp":
            case "w":
                changePostionTo(object, "y", "-", velY)
                break;
            case "ArrowDown":
            case "s":
                changePostionTo(object, "y", "+", velY)
                break;
        }
    }    

    
}

document.addEventListener("keydown", function(event) {
    let keys_x = ["ArrowLeft", "ArrowRight", "a", "d"]
    let keys_y = ["ArrowUp", "ArrowDown", "w", "s"]
    for(let i in keys_x){
        if(keys_x[i] === event.key){
            movement_x_ON_OUT = true
            xDirection = event.key
    }
    for(let i in keys_y){
        if(keys_y[i] === event.key){
            movement_y_ON_OUT = true
            yDirection = event.key         
        }
    }
}
});

document.addEventListener("keyup", function(event) {
    let keys_x = ["ArrowLeft", "ArrowRight", "a", "d"]
    let keys_y = ["ArrowUp", "ArrowDown", "w", "s"]
    for(let i in keys_x){
        if(keys_x[i] === event.key){
            movement_x_ON_OUT = false
            xDirection = ""
        }
    }
    for(let i in keys_y){
        if(keys_y[i] === event.key){
            movement_y_ON_OUT = false
            yDirection = ""
        }
    }
});


//<Mapa---------------------------->
var mapaInt = []
var mapa = document.getElementById("map")

mapa.width = innerWidth
mapa.height = innerHeight

var ctx = mapa.getContext("2d")
let x_or_y = "x";


setInterval(()=>{
    for(let k in dataJson){
        //in molecules
        for(let i in dataJson[k].atoms){
            //in atoms

            //variables for the object
            let objectX = dataJson[k].atoms[i].position.posX
            let objectY = dataJson[k].atoms[i].position.posY
            let objectWidth = dataJson[k].atoms[i].width
            let objectHeight = dataJson[k].atoms[i].height
            let objectVelX = dataJson[k].atoms[i].velX
            let objectVelY = dataJson[k].atoms[i].velY
            let objectColor = dataJson[k].atoms[i].color

            ctx.fillStyle = objectColor;

            if(movement_x_ON_OUT && x_or_y == "x"){
                ctx.clearRect(objectX, objectY, objectWidth, objectHeight)
                switch(xDirection){     
                    case "a": 
                    case "ArrowLeft":
                        //for(let i = 0; i < (objectHeight/pixW); i++){
                            /*
                            ctx.beginPath();
                            ctx.moveTo(objectX-objectVelX, objectY+1+(i*pixW));
                            ctx.lineTo(objectX-objectVelX+objectWidth, objectY+1+(i*pixW));
                            lineWidth = 1;
                            ctx.strokeStyle = "white"
                            ctx.stroke();*/
                            ctx.beginPath();
                            ctx.roundRect(objectX-objectVelX, objectY, objectWidth, objectHeight,50);
                            ctx.fill();
                        //}
                        break;
                    case "d":
                    case "ArrowRight":
                        /*
                        ctx.beginPath();
                        ctx.moveTo(objectX+objectVelX, objectY+1);
                        ctx.lineTo(objectX+objectVelX+pixW, objectY+1);
                        lineWidth = 1;
                        ctx.strokeStyle = "white"
                        ctx.stroke();*/
                        ctx.beginPath();
                        ctx.roundRect(objectX+objectVelX, objectY, objectWidth, objectHeight,50);
                        ctx.fill();
                        break;
                    }   
            }
            if(movement_y_ON_OUT && x_or_y == "y"){
                ctx.clearRect(objectX, objectY, objectWidth, objectHeight)
                switch(yDirection){     
                    case "w":
                    case "ArrowUp":
                        /*
                        ctx.beginPath();
                        ctx.moveTo(objectX+1, objectY-objectVelY);
                        ctx.lineTo(objectX+1, objectY-objectVelY+pixW);
                        lineWidth = 1;
                        ctx.strokeStyle = "white"
                        ctx.stroke();*/
                        ctx.beginPath();
                        ctx.roundRect(objectX, objectY-objectVelY, objectWidth, objectHeight,50);
                        ctx.fill();
                        break;
                    case "s":
                    case "ArrowDown":
                        /*
                        ctx.beginPath();
                        ctx.moveTo(objectX+1, objectY+objectVelY);
                        ctx.lineTo(objectX+1, objectY+objectVelY+pixW);
                        lineWidth = 1;
                        ctx.strokeStyle = "white"
                        ctx.stroke();*/
                        ctx.beginPath();
                        ctx.roundRect(objectX, objectY+objectVelY, objectWidth, objectHeight,50);
                        ctx.fill();
                        break;
                    }
            }

            continuesMovementON_OUT(dataJson[k].atoms[i], objectVelX, objectVelY)
    }}
    if(x_or_y == "x"){
        x_or_y = "y";
    }else if(x_or_y == "y"){
        x_or_y = "x";
    }
    
    
},1);


const UnitCharge = 0.417;
const electronCharge = 1.602176634e-19; 
const coulomb = 9e10// Coulombs

//columb * (unitCharge * electronCharge1) + (unitCharge * -electronCharge1) / (distanceX^2) = force

const sensitivity = 0.000000001

//Para hacer que atraiga lo atomos
function setVelocity(){
    for(let i in dataJson){
        if(dataJson[i].atoms.length > 1){
            for(let j in dataJson[i].atoms){
                for(let k in dataJson[i].atoms){
                    if(j != k){
                        let charge1 = dataJson[i].atoms[j].charge
                        let charge2 = dataJson[i].atoms[k].charge

                        let distanceX = dataJson[i].atoms[j].position.posX - dataJson[i].atoms[k].position.posX
                        let distanceY = dataJson[i].atoms[j].position.posY - dataJson[i].atoms[k].position.posY
                        let distance = Math.sqrt(distanceX**2 + distanceY**2)
                        let force = coulomb * (UnitCharge * electronCharge * charge1 + UnitCharge * -electronCharge * charge2) / ((distance**2)*sensitivity)
                        let acceleration = force / 1 //mass of the atom is 1
                        let velX = acceleration * (distanceX / distance)
                        let velY = acceleration * (distanceY / distance)
                        dataJson[i].atoms[j].velX += velX
                        dataJson[i].atoms[j].velY += velY
                        console.log("Force: ", force, "Acceleration: ", acceleration, "VelX: ", velX, "VelY: ", velY)
                    }
                }
            }
        }
    }
}

function setPosition(indexI, indexJ){
    for(let i in dataJson){
        for(let j in dataJson[i].atoms){
            if(indexI == i&& indexJ == j){
                dataJson[i].atoms[j].position.posX += dataJson[i].atoms[j].velX
                dataJson[i].atoms[j].position.posY += dataJson[i].atoms[j].velY
            }
        }
    }
}
function setPositionReview(indexI, indexJ){
    for(let i in dataJson){
        for(let j in dataJson[i].atoms){
            if(indexI == i&& indexJ == j){
                dataJson[i].atoms[j].position.posX += dataJson[i].atoms[j].velX
                dataJson[i].atoms[j].position.posY += dataJson[i].atoms[j].velY
                return [dataJson[i].atoms[j].position.posX, dataJson[i].atoms[j].position.posY]
            }
        }
    }
}

setInterval(()=>{
    setVelocity()
    
    for(let i in dataJson){
        for(let j in dataJson[i].atoms){
            let objectX = dataJson[i].atoms[j].position.posX
            let objectY = dataJson[i].atoms[j].position.posY
            let objectWidth = dataJson[i].atoms[j].width
            let objectHeight = dataJson[i].atoms[j].height
            let objectColor = dataJson[i].atoms[j].color
            ctx.clearRect(objectX, objectY, objectWidth, objectHeight)

            pos = setPositionReview(i, j)
            

            setPosition(i, j)
            objectX = dataJson[i].atoms[j].position.posX
            objectY = dataJson[i].atoms[j].position.posY
            objectWidth = dataJson[i].atoms[j].width
            objectHeight = dataJson[i].atoms[j].height
            ctx.fillStyle = objectColor;
            ctx.beginPath();
            ctx.roundRect(objectX, objectY, objectWidth, objectHeight,50);
            ctx.fill();
        }
    }
}, 1000/60)
