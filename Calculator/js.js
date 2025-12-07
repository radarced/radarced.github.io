let ELs = {};
import { NumberArr, OperatorArr } from "./Other.js";
import { CreateInitialData } from "./Other.js";
import { CreateButtons } from "./Other.js";
import {add,subtract,multiply,divide,modulus} from "./calc.js"
let TextBoxData ={
    memory : [0,'+',0],
    pointer : 0,
    result : 0
}
const OPERATOR_INDEX = 1;
const NUMBER1_INDEX = 0;
const NUMBER2_INDEX = 2;
// let fractionalPart = false;
// let fractionalParta = ""; 

function InitialLoad()
{
    GetEl_Refs();
    CreateInitialData();
    CreateButtons(NumberArr,OperatorArr,ELs.NumberBox,ELs.OperatorBox);
    AddListeners();
}

function GetEl_Refs()
{
    ELs.main_ctr = document.querySelector("#main-ctr");
    ELs.NumberBox = document.querySelector("#NumbersBox");
    ELs.SmallContainer = document.querySelector("#small-ctr");
    ELs.OperatorBox = document.querySelector("#OperatorsBox");
    ELs.TextBox = document.querySelector("#TextBox");
}

function AddListeners()
{
    ELs.SmallContainer.addEventListener("click",(e)=>{
        let Target = e.target;
        if(Target.className === "Number")
        { // user Clicked on a number
            HandleNumber_E(Target.id);
        }else if(Target.className === "Operator")
        {
            HandleOperator_E(Target.id);
        }
    })
}

function HandleNumber_E(id)
{
    let NumberId = ConvertNum(id);
    console.log(NumberId);
    if(!(isNaN(NumberId)))
    { // if not CL or .
        // so basically all the pointers changing would be done by the operatorHandler
            TextBoxData.memory[TextBoxData.pointer] = `${TextBoxData.memory[TextBoxData.pointer]}${NumberId}`;
            console.log(TextBoxData);
            TextBoxData.memory[TextBoxData.pointer] = ConvertNum(TextBoxData.memory[TextBoxData.pointer]);
        // ELs.TextBox.innerText = `${TextBoxData.memory[TextBoxData.pointer]}`;    
    }else if(id === "CL")
    {
        ClearMemory();
    }else if(id === "." && TextBoxData.memory[TextBoxData.pointer] === Math.round(TextBoxData.memory[TextBoxData.pointer]))
    {
        TextBoxData.memory[TextBoxData.pointer] = `${TextBoxData.memory[TextBoxData.pointer]}.0`;
        console.log("lololo theres no . function ");
        TextBoxData.memory[TextBoxData.pointer] = ConvertNum(TextBoxData.memory[TextBoxData.pointer]);
    }
    DisplayMemory();
}

function HandleOperator_E(id)
{
    switch(TextBoxData.pointer)
    {
        case NUMBER1_INDEX :
        TextBoxData.memory[OPERATOR_INDEX] = id;
        TextBoxData.pointer = NUMBER2_INDEX;
        break;
        case OPERATOR_INDEX:
        console.log("DID IT REALLY REACH THE OPERATOR INDEXX? :_:",TextBoxData);
        break;
        case NUMBER2_INDEX:
        OperatorHandler2nd(id); 
        // TextBoxData.pointer = NUMBER1_INDEX; we let it stay on the end cuz it doesnt change anyway 
        break;
    }
    DisplayMemory();
}
function OperatorHandler2nd(id)
{ // assuming the pointer is on the NUMBER2_INDEX
    let success = false;
    if(id === '=')
    {
        success = Compute(TextBoxData.memory);
        if(success)
        {
            TextBoxData.pointer = NUMBER1_INDEX;
        }else
        {
            ClearMemory();
        }
    }else
    { // on other basic ones like +-/%x compute then change the operator
        success = Compute(TextBoxData.memory);
        if(success)
        {
        TextBoxData.memory[OPERATOR_INDEX] = id;
        TextBoxData.pointer = NUMBER2_INDEX;        
        }else
        {
            ClearMemory();
        }
    }
} 

function ClearMemory()
{
    TextBoxData.memory[0] = 0;
    ResetMemory();
    TextBoxData.pointer = NUMBER1_INDEX;
}

function DisplayMemory()
{
    ELs.TextBox.innerText = `${TextBoxData.memory[NUMBER1_INDEX]}${TextBoxData.memory[OPERATOR_INDEX]}${TextBoxData.memory[NUMBER2_INDEX]}`;
}

function Compute(array)
{ // array comes in like [number,operator,number] Outputs - > [number,'+',0];
    switch(array[1])
    {
        case '+':
        array[0] = add(array[0],array[2]);
        ResetMemory();
        break;
        case '-':
        array[0] = subtract(array[NUMBER1_INDEX],array[NUMBER2_INDEX]);
        ResetMemory();
        break;
        case '/' :
        array[0] = divide(array[NUMBER1_INDEX],array[NUMBER2_INDEX]);
        if(array[0] === null)
        {
            return false;
        }
        ResetMemory();
        break;
        case '%' :
        array[0] = modulus(array[NUMBER1_INDEX],array[NUMBER2_INDEX]);
        if(array[0] === null)
        {
            return false;
        }
        ResetMemory();
        break;
        case 'x' :
        array[0] = multiply([array[NUMBER1_INDEX],array[NUMBER2_INDEX]]);
        ResetMemory();
        break;
        case '=' :
        ResetMemory()
        TextBoxData.pointer = NUMBER1_INDEX;
        break;
    }
    return true;
}

function ResetMemory()
{
    TextBoxData.memory[1] = '+';
    TextBoxData.memory[2] = 0;
}

function ConvertNum(string)
{
    return Number(string);
}

InitialLoad();