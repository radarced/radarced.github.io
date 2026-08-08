import { displayStates } from "./RenderManager.js";
import GameHtml from "./GameHTML.js"

import { getRowBadge,getColumnBadge } from "./utilities.js";
const N_OF_ROWS_COLS = 3;


let elementsCtr = (()=>{
    
    let mainContainer = document.querySelector(".main-container");
    let gameMenu = getDomEl(GameHtml); // this is an object containing all game-menu elements as properties 
    PopulateBoard(gameMenu.board);
    PopulateInputContainer(gameMenu.inputContainer);
    // console.log(Board.board);
    // console.log(Board.inputContainer);
    // console.log(Board.interactablesContainer); for reference
    

    let startMenu = {
        startBtn : document.querySelector(".play"),
    };

    function appendElements(curr_displayState)
    {
        switch(curr_displayState)
        {
            case displayStates.menu:
                
                mainContainer.classList.remove("game-menu");
                mainContainer.classList.add("main-menu");
                mainContainer.appendChild(startMenu.startBtn);

            break;
            case displayStates.game :
            
            mainContainer.classList.remove("main-menu");
            mainContainer.classList.add("game-menu");
            for(let elementKey in gameMenu)
                {
                    mainContainer.appendChild(gameMenu[elementKey]);
                }
            
                break;
        }
    }

    function removeElements(displayState)
    {
        switch(displayState)
        {
            case displayStates.menu :
                mainContainer.innerHTML = ""; // this does not remove our old elements or their event Handlers.
            break;
            case displayStates.game :
                mainContainer.innerHTML = "";
            break;
            case displayStates.end :

            break;
        }
    }

    function removeAllActiveClasses()
    {
        let inputs = gameMenu.inputContainer.children;
        for(let i = 0;i < inputs.length;i++)
        {
            let item = inputs[i];
            item.classList.remove("active");
        }
    }

    // GETTERS 
    function getMenuElemenets()
    {
        return startMenu;
    }

    function getGameElements()
    {
        return gameMenu;
    }

    function getBoard()
    {
        return gameMenu.board;
    }

    function getCell(row,col,N_of_rows_cols)
    {

        // figure out the current Badge
        let rowBadge = getRowBadge(row); // 0-2
        let columnBadge = getColumnBadge(col); // 0-2
            
        let currentBadgeIndex = N_of_rows_cols * rowBadge + columnBadge;
            
        // actual Dom manipulation
        let currentBadge = gameMenu.board.children[currentBadgeIndex];
        let localRow = row % 3;
        let localCol = col % 3; // modulus models it coherently and thats all that matters rn
        
        let currentCellIndex = localRow * N_of_rows_cols + localCol;
        let currentCell = currentBadge.children[currentCellIndex]; 

        return currentCell;
    }

    return {getMenuElemenets,getGameElements,removeElements,appendElements,getBoard,getCell,removeAllActiveClasses}
})()
// returns an object which contains the different displayStates elements inside each property as "objects" 
// which would be obtained by invoking the methods that the elementsCtr provides 
// its the one handling everything related to accessing , deleting , appending , creating elements .


// this should return all DOM elements inside the HTMLString in an object .
// hence take all children of the body element loop over all of them and then put them in another object
function getDomEl(HTMLString)
{
    let newParser = new DOMParser();
    // 2. Parse the string into a detached HTML document
    const doc = newParser.parseFromString(HTMLString, 'text/html');
    let elements = {};

    let children = doc.body.children;
    for(let i = 0; i < children.length;i++)
    {
        let element = children[i];
        elements[element.className] = element;
    }

    return elements;
}

function PopulateBoard(board)
{
        for(let i = 0;i< 9;i++)
    {
        let Badge = document.createElement("div");
        Badge.className = "Badge";
        Badge.dataset.badge_number = i;
        for(let j = 0 ;j< 9;j++)
    {
        let col = 0; // row,col vars are what correspond to my board data represenation
        let cell = document.createElement("div");
        cell.className = "Cell";
        cell.dataset.cell_number = j;
        Badge.appendChild(cell);
    }
    board.appendChild(Badge);
    }
    // setting the data attributes of the cells
    
    let badges = board.children;
    
    for(let BadgeIndex = 0;BadgeIndex < 9;BadgeIndex++)
    { // pick out each badge from badges
        let badge = badges[BadgeIndex];
        // now in the local grid we'll assign each cell a row and col such that it maps to the "global" grid;
// or assign its position in another grid using its local subgrid position 

    let startingPos = {
        row : Math.floor(BadgeIndex / N_OF_ROWS_COLS) * N_OF_ROWS_COLS ,
        col : (BadgeIndex % N_OF_ROWS_COLS) * N_OF_ROWS_COLS };
        

        for(let i = 0;i < N_OF_ROWS_COLS ;i++)
        { // looping through the subgrid now 

        for(let j = 0 ;j < N_OF_ROWS_COLS ;j++)
        {
            let cell = badge.children[i * N_OF_ROWS_COLS + j]; // getting the cell using the 2d array to 1d array map formula

            cell.dataset.row = startingPos.row + i;
            cell.dataset.col = startingPos.col + j;

        }
        }
    }

}

function PopulateInputContainer(input_container)
{
    
let box = document.createElement("div");
box.className = "input";
box.innerHTML = "&nbsp";
box.dataset.char = " ";

input_container.appendChild(box);

for(let i = 1;i<=9;i++)
{
    let box = document.createElement("div");
    box.className = "input";
    box.innerHTML = i;
    box.dataset.char = i;

    input_container.appendChild(box);
}

}

export default elementsCtr;
