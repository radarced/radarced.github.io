let numbersCtr = document.querySelector(".numbersCtr");
let operatorsCtr = document.querySelector(".operatorsCtr");

let numbers = [];
let operators = [];

export function createInitial()
{
    createInitialArr(); // populates the number,operators array;
    for(let i = 0;i<= 3;i++)
    { // 4 numberCtr rows
        let row = document.createElement("div");
        row.className = "row";
    for(let  j = 0;j < 3;j++)
    {
        let item = numbers[3 * i + j]; // i got 3n from sequence and stuff idk ;-;
        let box = document.createElement("div");
        // when non-numeric strings are converted into numbers they become NaN so check for that instead cuz NaN is also of "number" datatype
        // okay great NaN == NaN is false and NaN === NaN is false so you can only use isNaN(). makes perfect sense!
        if(!isNaN(+item))
        { // its a number
            box.className = "box number";
            box.textContent = item;
        }else if(item === '.')
        {
            box.className = "box dot";
            box.textContent = '.';
        }else 
        { // = operator
            box.className = "box operator";
            box.textContent = '=';
        }
        row.appendChild(box);
    }
        numbersCtr.appendChild(row);
    }
  
    for(let i = 0;i<4;i++)
    {
    
    let row = document.createElement("div");
    row.className = "row";
            
    for(let j = 0;j < 2;j++)
    {
        if(2 * i + j >= 5)
        {
            let operator = '';
        let box = document.createElement("div");
        box.className = "emptyBox";
        box.textContent = operator;
        row.appendChild(box);
        continue;
        }
        let operator = operators[2 * i + j]
        let box = document.createElement("div");
        box.className = "box operator";
        box.textContent = operator;
        row.appendChild(box);
    }
    operatorsCtr.appendChild(row);
    }
}


function createInitialArr()
{
    createInitialNums();
    createInitialOps();
}

function createInitialNums()
{
    numbers.length = 12;
    for(let i = 1;i<=9;i++)
    {
        numbers[i - 1] = `${i}`;
    }
    numbers[9] = '.';
    numbers[10] = '0';
    numbers[11] = '=';
}

function createInitialOps()
{
    operators.length = 5;
    operators[0] = '+';
    operators[1] = '-';
    operators[2] = '*';
    operators[3] = '/';
    operators[4] = '%';
}
