const canvas = document.getElementById('canvas1'); 
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.globalCompositeOperation = 'luminosity';
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation

let colorInput = prompt("Pleasr Enter the color you need");

const edge = 70;
let drawing = false;

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
     constructor(x, y, color, centerX, centerY){
        this.x = x;
        this.y = y;
        this.color = color;
        this.centerX = centerX;
        this.centerY = centerY;
        this.speedX = 0;
        this.speedY = 0;
     }

     draw(){
        this.speedX += (Math.random()-0.5) /2;
        this.speedY += (Math.random()-0.5) /2;
        this.x += this.speedX;
        this.y += this.speedY;
        
        const distanceX = this.x - this.centerX;
        //distance from center of particle to x position
        const distanceY = this.y - this.centerY;
        //distance from center of particle to y position
        const distance = Math.sqrt(distanceX*distanceX + distanceY*distanceY);
        //using pythagoras theorem to calculate distance
        // basically hypotenuse formed by traingle of xand y position
        const radius = (-distance/edge +1)*edge / 10;

        if(radius>0){
            requestAnimationFrame(this.draw.bind(this));
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, 2*Math.PI);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.strokeStyle= 'black';
            ctx.stroke();
        }
     }
}
function branchOut(){
    if(drawing){
    const centerX = mouse.x;
    const centerY = mouse.y;
    for(let i=0;i<3;i++){
        const root = new Root(mouse.x, mouse.y, colorInput, centerX, centerY);
        root.draw();
    }
}
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('mousemove', function(){
   // ctx.fillStyle= 'rgba(255,255,255,0.03)';
   // ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    branchOut();
});

window.addEventListener('mousedown', function(){
    drawing= true;
});

window.addEventListener('mouseup', function(){
    drawing= false;
});