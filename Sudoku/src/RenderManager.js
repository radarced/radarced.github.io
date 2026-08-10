const displayStates = {
    menu : "menuState",
    game : "gameState",
    end : "endMenuState",
} // the possible displayStates ; now that i think about it renderState , gameState will be the same across all "states" so its better to be generic cuz its just redundant to hold 2 different variables that tell the same thing .

import elementsCtr from "./ElementsContainer.js";

let RenderManager = (()=>{

    let curr_displayState = displayStates.menu; // uiState variable  3 vals currently (menuState,gameState,endMenuState)


    let displayBoard =  function(board)
    {

        let boardArray = board.getBoard();
        let N_of_rows_cols = board.getSize();

        for(let i = 0;i < 9;i++)
        { // i = current_row
            for(let j = 0;j < 9;j++)
            { // j = current_col

                let currCell = boardArray[i][j];
                let currentCell = elementsCtr.getCell(i,j,N_of_rows_cols);
                currentCell.innerText = currCell;

            }
        }
    }   

    function displayInputCtr(gameState)
    {
        let inputChoice = gameState.inputChoice;
        // loop over the inputCtr children find the one whose dataset.char is inputChoice .
        // make that active and remove it from everyone else .

        let inputs = elementsCtr.getGameElements().inputContainer.children; // inputs variable is an object instance of HTMLColleciton 
        for(let i = 0;i < inputs.length;i++)
        {
            let currentInput = inputs[i];
            if(currentInput.dataset.char === inputChoice)
            {
                currentInput.classList.add("active");
            }else
            {
                currentInput.classList.remove("active");
            }
        }
    }

    function displayMenu(menuState)
    {

    }

    function displayEndMenu(gameState)
    {

    }

    // GETTERS and SETTERS 
    function updateDisplay(state_toSwitch)
    {
        
    // curr_displayState is the old state ; state_toSwitch is the new state.

    elementsCtr.removeElements(curr_displayState); // e.g : if menu - > game then remove menu ELs ; if end - > game then remove end Elements
    elementsCtr.appendElements(state_toSwitch);    
        if(state_toSwitch === displayStates.menu)
        {
            elementsCtr.removeAllActiveClasses();
        }

        curr_displayState = state_toSwitch;
    }

    function getDisplay()
    {
        return displayState;
    }

    function getDisplayBoardCallback()
    {
        return displayBoard;
    }


    return {displayBoard,displayMenu,displayEndMenu,updateDisplay,getDisplay,displayInputCtr
        ,getDisplayBoardCallback
    };

})();

export {RenderManager,displayStates};
// what should the RenderManager know?:
// it should know how the state will be converted into display.
// rendering in webdev means to manipulate the DOM . 

// updating the displayState causes shifts in the DOM .
// displaying the current displayState just updates what is already in the DOM .

// because manipulating the elements is part of DOM manipulation Render Manager
// should know about elementsCtr and be able to update the elements existence from the latters methods 

