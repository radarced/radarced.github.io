let references = {
    mainCtr : document.querySelector(".container"),
    sizeChanger : document.querySelector(".sizeChanger")
}

let lastColored;

const DEFAULT_N_BOXES = 16;

function main()
{
    populateContainer(DEFAULT_N_BOXES);
    references.mainCtr.addEventListener("mousemove",boxColor);
    references.sizeChanger.addEventListener("click",
        () => {
            let size = +prompt("specify the size of the grid from 1-100",16);
            let valid = validateSize(size)
            switch(valid)
            {
                case true :
                    resetGrid(size);
                break;
                case false : 
                
                alert("enter an appropriate size");

                break;
                default :
                break;
            }
        }
    )
}

function boxColor(e)
{
    let eventTarget = e.target;
    let class_name = eventTarget.className;
    let id = eventTarget.id;

    // if its not a box OR its the last coloredBox then we return;
    if(!(isBox(class_name)) || isLastColored(lastColored,id))
    {
        return ; 
    }
    let box = eventTarget; // pointing to the same ref just box is alot more intuitive
    
    lastColored = box;

    console.log("YAY COLORED THE BOX WOOHOO");

    box.style.backgroundColor = getRandColor();

    // because the node object stores almost eveyrthing as a  string
    if(+(box.style.opacity) < 1)
    {
    box.style.opacity = +(box.style.opacity) * 1.1;
    }

}

// related to resetting functions
function validateSize(size)
{    // assumes size is of number datatype
    if(!size) // null or empty string or 0 
        return null;

    if(size >= 1 && size <= 100)
    { // valid size
        return true;
    }

    return false;
}

function resetGrid(size)
{ // we have to delete the entire grid and then populate it again
    references.mainCtr.textContent = ""; // resets the entire container
    populateContainer(size);
}

// utitily functions 
function isBox(class_n)
{
    return (class_n === "box");
}

function isLastColored(last,id)
{
    // the below condition means that the user has not clicked at ANY box
    if(last === undefined)
    {
        return false;
    }

    return (last.id === id);
}

function getRandColor()
{ // return a hex string
    hex_str = "#";
    // add 6 hex characters to it [0-9,A,B,C,D,E,F];
    for(let i = 0;i < 6;i++)
{
    let randomHex = Math.floor(Math.random() * 16) ; // 0-15
    
    switch(randomHex)
    {
        case 10 :
            hex_str += 'a';
        break;
        case 11 :
            hex_str += 'b';
        break;
        case 12 :
            hex_str += 'c';
        break;
        case 13 :
            hex_str += 'd';
        break;
        case 14 :
            hex_str += 'e';
        break;
        case 15 :
            hex_str += 'f';
        break;
        default : 
        hex_str += randomHex;
        break;
    }
}
    return hex_str;
}

// INIT function
function populateContainer(n_of_boxes)
{
    let index = 1;
    for(let i = 1;i <= n_of_boxes;i++)
    {
        let row = document.createElement("div");
        // row.id = i;
        row.className = "row";

        for(let j = 1;j <= n_of_boxes;j++)
        { // create a div.box element and append it to mainCtr
            let box = document.createElement("div");
            box.className = "box";
            box.id = index;
            box.style.opacity = 0.3; // the range is [0-1] inclusive
            row.appendChild(box);
            index++;
        }
        references.mainCtr.appendChild(row);
    }
}


main();