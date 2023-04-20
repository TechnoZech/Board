//Selectors
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
let context = canvas.getContext("2d");

let getColor = document.querySelector(".tool_container");
let current = document.querySelector(".current");


let draw_color = "white";
let draw_width = "5";
let is_drawing = false;


//Event Listeners
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("touchend", stop, false);

getColor.addEventListener("click", changeColor);

//Functions

function start(e){
    is_drawing = true;
    context.beginPath();
    context.moveTo(e.clientX, e.clientY + 35);
    e.preventDefault();
}

function draw(e){
    if(is_drawing){
        context.lineTo(e.clientX , e.clientY + 35);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    }
    e.preventDefault();
}

function stop(e){
    if(is_drawing){
        context.stroke();
        context.closePath();
        is_drawing = false;
    }
    e.preventDefault();
}

let prevColor = current;

function changeColor(e){
    if(e.target.classList == "colors"){
        draw_color = e.target.style.background;
        prevColor.classList.remove("current");
        e.target.classList.add("current"); 
        prevColor = e.target;
    }
}