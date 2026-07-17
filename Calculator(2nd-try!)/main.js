import {createInitial} from "./initial.js"
import { evaluate } from "./calculations.js";

// REFERENCES 
const references = {
    numberCtr : document.querySelector(".numberCtr"),
    operatorsCtr : document.querySelector(".operatorsCtr"),
    interactablesCtr : document.querySelector(".interactablesCtr"),
    smallDisplay : document.querySelector(".smallDisplay"),
    bigDisplay : document.querySelector(".bigDisplay"),
    clearAll : document.querySelector(".clearAll"),
    clear : document.querySelector(".clear"),
}

// CONSTANTS
const NUM1_POS = 1;
const OP_POS = 2;
const NUM2_POS = 3;

// STATE 
const state = {
    pointer : NUM1_POS, // {num1Pos,opPos,num2Pos}
    num1 : '', // defaultValue = ''; this'll be the number dataType
    op : '', // defaultValue = ''; this'll be the string dataType
    num2 : '', // defaultValue = ''; this'll be the number dataType
    result : "", // this stores the entire expression as a string like 4 * 3 = 12;
    oldResult : false, // this is a variable used as a condition to display the result or not.
}

function main()
{
    createInitial();
    attachEventHandlers();
}

main();

function attachEventHandlers()
{   
    references.interactablesCtr.addEventListener("click",Handle_boxClick);
    references.clearAll.addEventListener("click",clearAll);
}

// EVENT HANDLERS 

function Handle_boxClick(e)
{
    let eventTarget = e.target;
    let className = eventTarget.className;

    // know that each box has two classNames : "box operator/number/dot" hence you split the className and parts[1] represents the type of the box
    if(className.includes("box"))
    { // a box was clicked!         
        let parts = className.split(' ');
        let type = parts[1];

        switch(type)
        {
            case "number" :
            Handle_numClick(eventTarget.textContent);
            break;
            case "dot" :
            Handle_dotClick();
            break;
            case "operator" :
            Handle_opClick(eventTarget.textContent);
            break;
        }
    }else
        {
            return;
        }
}

// no pointer changes will happen  in this function
function Handle_numClick(number)
{ // number is a string 
    switch(state.pointer)
    {
        case NUM1_POS :
            // we're on the number position hence add the number to the state
            state.num1 = BigInt(`${state.num1}${number}`);
            StopDisplayingResult();
        break;
        case NUM2_POS :
            state.num2 = BigInt(`${state.num2}${number}`);
            StopDisplayingResult();
        break;
        // actually i think there will be no operatorPos since we just skip it directly
        default : 
        console.log("i doubt this'll occur");
        break;
    }
    renderOutput();
}

function Handle_dotClick()
{
}

// if user entereed '=' after entering num1 only - > no response
function Handle_opClick(operator)
{
    switch(state.pointer)
    {
       case NUM1_POS :
        if(!(operator === '='))
        { 
            StopDisplayingResult();
            state.op = operator;
            state.num2 = '';
            state.pointer = NUM2_POS;
        }
        break;
        case NUM2_POS :
        if(!(operator === '='))
        {
            let expression = {num1 : state.num1,op : state.op,num2 : state.num2};
            let expression_result = evaluate(expression);
            state.result = `${state.num1} ${state.op} ${state.num2} = ${expression_result}`
            state.num1 = expression_result; // evaluate the expression and assign the result to num1 value cuz the user wants to do the operation on the result
            state.num2 = '';
            state.oldResult = true;

            state.op = operator;
            state.pointer = NUM2_POS;

        }else
        { // the user press the '=' operator on position num2 hence evaluate the result and put pointer to num1
            let expression = {num1 : state.num1,op : state.op,num2 : state.num2};
            let expression_result = evaluate(expression);
            state.result = `${state.num1} ${state.op} ${state.num2} = ${expression_result}`
            state.num1 = expression_result;
            state.oldResult = true;
            state.num2 = '';
            
            state.pointer = NUM1_POS;
            state.op = '';
        }
        break;
    }
    renderOutput();
}

function clearAll()
{
    state.pointer = NUM1_POS;
    state.num1 = '';
    state.op = '';
    state.num2 = '';
    state.result = ""; 
    state.oldResult = false;
    renderOutput();
}

// RENDERING FUNCTIONS :

// this will be repeatedly called even when it is actually false but atleast 
// everything else stays consistent so idc
function StopDisplayingResult()
{
    state.oldResult = false;
}

// this will purely operate based upon the state and not the current real time input
// my render requirements :
// - the bigDisplay can never show operators .
// - the oldResult should be shown when the user has not entered any input after the preceding result was calculated
function renderOutput()
{
 
    switch(state.pointer)
    {
        case NUM1_POS :
        
        references.bigDisplay.textContent = `${state.num1}`;
        if(state.oldResult)
        { // if the oldResult should be shown
            references.smallDisplay.textContent = state.result;            
        }else
        {
            references.smallDisplay.textContent = "";
        }
        break;
        case NUM2_POS :
        
        references.bigDisplay.textContent = `${state.num2}`;
        if(state.oldResult)
        {
            references.smallDisplay.textContent = state.result;            
        }else
        {
            references.smallDisplay.textContent = `${state.num1} ${state.op} `;
        }
        break;
    }
}