const displayStates = {
    menu : "menuState",
    game : "gameState",
    end : "endMenuState",
} // the possible displayStates

import elementsCtr from "./ElementsContainer.js";

let RenderManager = (()=>{

    let curr_displayState = displayStates.menu; // uiState variable  3 vals currently (menuState,gameState,endMenuState)

    function displayGame(gameState)
    {

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

        curr_displayState = state_toSwitch;
    }

    function getDisplay()
    {
        return displayState;
    }


    return {displayGame,displayMenu,displayEndMenu,updateDisplay,getDisplay};

})();

export {RenderManager,displayStates};
// what should the RenderManager know?:
// it should know how the state will be converted into display.
// rendering in webdev means to manipulate the DOM . 

// updating the displayState causes shifts in the DOM .
// displaying the current displayState just updates what is already in the DOM .

// because manipulating the elements is part of DOM manipulation Render Manager
// should know about elementsCtr and be able to update the elements existence from the latters methods 

