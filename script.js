//Selectors
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 10;
let context = canvas.getContext("2d");

let getColor = document.querySelector(".tool_container");
let current = document.querySelector(".current");
let brushSize = document.querySelector(".input_range");
let clear = document.querySelector(".clear");
let undo = document.querySelector(".undo");


let draw_color = "white";
let draw_width = "10";
let is_drawing = false;

let restore_array = [];
let index = -1;


//Event Listeners
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("touchend", stop, false);

getColor.addEventListener("click", changeColor);
brushSize.addEventListener("input", updateBrushSize);
clear.addEventListener("click", clearCanvas);
undo.addEventListener("click", undoCanvas);

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

    //pushing current drawing data into an array
    restore_array.push(context.getImageData(0,0, canvas.width, canvas.height));
    index += 1;

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

function updateBrushSize(e){
    draw_width = e.target.value;
}

function clearCanvas(e){
    context.clearRect(0,0, canvas.width, canvas.height);

    restore_array = [];
    index  = -1;
}

function undoCanvas(e){
    if(index <= 0){
        clearCanvas();
    }else{
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index], 0,0);
    }
}