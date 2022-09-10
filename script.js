const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let inputColor = document.getElementById('color-input');
let inputSize = document.getElementById('brush-size');
let inputInnerColor = document.getElementById('inner-color');
ctx.globalCompositeOperation = 'luminosity';
const drawbtn = document.getElementById('start');
const resetbtn = document.getElementById('rst');
let color= 'red';
let innerColor= 'white';
let edge = 50;
let drawing = false;
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation
//inner color is working
function startDrawing(){
   color  = inputColor.value;
   innerColor = inputInnerColor.value;
   edge       = inputSize.value;
    
}

function resetCanvas(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

//setting up object for mouse position
const mouse = {
    x: null,
    y: null
}

//getting data of mouse pointer using mousemove
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

//making a blueprint of the function that we will call many times to make
// randomized particles

class Root {
     constructor(x, y, color, inrColor, centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = color;
        this.inrColor= inrColor;
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedX = 0;
        this.speedY = 0;
     }

     draw(){
        this.speedX += (Math.random()-0.5) ;
        this.speedY += (Math.random()-0.5) ;
        this.x += this.speedX;
        this.y += this.speedY;
        this.color= color;
        this.innerColor= innerColor;
        
        const distanceX = this.x - this.centerX;
        //distance from center of particle to x position
        const distanceY = this.y - this.centerY;
        //distance from center of particle to y position
        const distance = (Math.sqrt(distanceX*distanceX + distanceY*distanceY));
        //using pythagoras theorem to calculate distance
        // basically hypotenuse formed by traingle of xand y position
        const radius = (-distance/edge +1)*edge / 10;

        if(radius>0){
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2*Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle= innerColor;
            ctx.stroke();
        }
     }
}
function branchOut(){
    if(drawing){
    const centerX = mouse.x;
    const centerY = mouse.y;
    for(let i=0;i<3;i++){
        const root = new Root(mouse.x, mouse.y, innerColor, color, centerX, centerY);
        root.draw();
    }
}
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function(){
 //  ctx.fillStyle= 'rgba(255,255,255,0.03)';
  //  ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    branchOut();
});

window.addEventListener('mousedown', function(){
    drawing= true;
});

window.addEventListener('mouseup', function(){
    drawing= false;
});
