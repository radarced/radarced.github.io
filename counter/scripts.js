const IncrementBtn = document.getElementById("increment");
const DecrementBtn = document.getElementById("decrement");
const ResetBtn = document.getElementById("reset");
// display counter - > h1 el;
const Display = document.getElementById("cntdisplay");
let counter = 0n; // bigInt resizable and stuff

IncrementBtn.addEventListener("click",()=>{
    counter++;
    updateDisplay();
})

DecrementBtn.addEventListener("click",()=>{
    counter--;
    updateDisplay();
})

ResetBtn.addEventListener("click",()=>{
    counter = 0;
    updateDisplay();
})


function updateDisplay()
{
    Display.innerText = `${counter}`;
}
