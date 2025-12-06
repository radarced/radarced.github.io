let Els = {};

import { getRandomColor } from "./util.js";
import { getRandBounded } from "./util.js";

const State = {
    LastClicked : null,
    row : 16,
    column : 16,
    Invoker : OnContainerInvoke,
    AiPainting : false
}

function GetEL_References()
{
    Els.container = document.querySelector(".container");
    Els.GridMaker = document.querySelector("#gridMaker");   
    Els.AiControls = document.querySelector("#AiControls");
}

function initBoxes(N)
{ // create N of columns / rows
    Els.container.innerHTML = "";
    State.row = N;
    State.column = N;
    for(let i = 0; i< N;i++)
    {
        let Row = document.createElement("div");
        Row.className = "row";
        Row.id = `${i}`;
        for(let j = 0;j<N;j++)
        {
            let Box = document.createElement("div");
            Box.className = "box";
            Box.id = `${j}`;
            Row.appendChild(Box);
        }
        Els.container.appendChild(Row);
    }
}

function OnContainerInvoke(e)
{
        let Target = e.target;
        if(Target != State.LastClicked)
        { // if its not on the same box
        if(Target.className === "box")
        {
            State.LastClicked = Target;
            Target.style.backgroundColor = getRandomColor();
        }
        }
}

function AddListeners()
{
    Els.container.addEventListener("mousemove",(e)=>{State.Invoker(e)})
    Els.container.addEventListener("touchmove",(e)=>{State.Invoker(e)})
    Els.GridMaker.addEventListener("click",()=>{
        let GridNumber = prompt("Enter a number between 0 and 800 for your grid",16);
        if(GridNumber !== null)
        {
            if(GridNumber > 0)
            {
                initBoxes(GridNumber);
            }
        }
    })
    Els.AiControls.addEventListener("click",AiPaint)
}

function AiPaint()
{ // so choose a row , column select the box then dispatch the click event on the container 
    State.AiPainting = !State.AiPainting;

}

function onAiContainerInvoke(e)
{
    let Target = e.customTarget;
    if(Target.className === "box")
        {
            State.LastClicked = Target;
            Target.style.backgroundColor = getRandomColor();
        }
        State.Invoker = OnContainerInvoke;
}


function InitialLoad()
{
    GetEL_References();
    initBoxes(16);
    AddListeners();
}
InitialLoad();

let a  = setInterval(()=>{
    if(State.AiPainting)
        {
            for(let i = 0;i < 10;i++)
        {
            let RandomRow = getRandBounded(State.row);
            let RandomColumn = getRandBounded(State.column);
            
            let RowEl = Els.container.children[RandomRow];
            let box = RowEl.children[RandomColumn];
            
            let event = new MouseEvent("mousemove",{ bubbles: true ,    cancelable: true,
                view: window});
                event.customTarget = box;
                State.Invoker = onAiContainerInvoke;
    Els.container.dispatchEvent(event);
}
        }           
},100);

/*
ok so i hate css ;
i dont know it at all ;
KEY TAKEAWAYS :
DOM EVENT LISTENERS DONT CHANGE THEIR CALLBACK FUNCTIONS AFTER BEING SET;
*/