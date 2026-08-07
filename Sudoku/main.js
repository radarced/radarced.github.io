// import the other Managers
import elementsCtr from "./src/ElementsContainer.js"; // singleton
import { RenderManager } from "./src/RenderManager.js"; // singleton
import GameManager from "./src/GameManager.js"; // singleton meaning there will be only be one instance of this object throughout the whole program

import { displayStates } from "./src/RenderManager.js"; // an object which contains the different displayStates possiblities

let EventsHandler = (()=>{

    function mainMenuHandler(mainMenu)
    {
        mainMenu.startBtn.addEventListener("click",startButtonHandler);
    }

    function gameMenuHandler(gameMenu)
    {
        
    }


    function startButtonHandler()
    {
        GameManager.startGame();
        // attach eventHandlers to each game Element as well.
        
        RenderManager.updateDisplay(displayStates.game);
        RenderManager.displayGame(GameManager.getState());
    }


    return {mainMenuHandler,gameMenuHandler};
})();

// adding eventHandlers during displayState transitioning is the eventHandlers job.
// because the DOM elements or the display Elements of each state dont get deleted when
// state transition we dont have to manipulate eventListeners 
// hence just leave them be after initialization .

function initial_event_listeners()
{
    EventsHandler.mainMenuHandler(elementsCtr.getMenuElemenets());
    EventsHandler.gameMenuHandler(elementsCtr.getGameElements());
}

initial_event_listeners();

// ^^ returns a module which encapsulates all the event handlers and their respective data .
// every execution starts from events in js .
// the elements references should be contained inside their respective "elements" modules like MenuScreen
// so the pipelining or the execution of my code becomes : elementsModule - > eventsHandler - > stateTransitioning - > RenderManager ( uses elementsModule AND state ) and itself doesnt contain the actual elements 
// because everything is event-driven the eventHandler is resposible for knowing every high level functionality .