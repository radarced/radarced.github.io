// import the other Managers
import elementsCtr from "./src/ElementsContainer.js"; // singleton
import { RenderManager } from "./src/RenderManager.js"; // singleton
import GameManager from "./src/GameManager.js"; // singleton meaning there will be only be one instance of this object throughout the whole program
import {convertInteractables} from "./src/utilities.js";
import { displayStates } from "./src/RenderManager.js"; // an object which contains the different displayStates possiblities

let EventsHandler = (()=>{

    function mainMenuHandler(mainMenu)
    {
        mainMenu.startBtn.addEventListener("click",startButtonHandler);
    }

    function startButtonHandler()
    {
        GameManager.updateState(displayStates.game);
        GameManager.startGame();
        // attach eventHandlers to each game Element as well.
        
        RenderManager.updateDisplay(displayStates.game);
        displayGame();
    }

    function gameMenuHandler(gameMenu)
    {
        gameMenu.board.addEventListener("click",boardHandler);
            
        // first priority .
        gameMenu.inputContainer.addEventListener("click",inputCtrHandler);

        // irrelevant currently 
        addInteractabesHandlers(gameMenu.interactablesContainer);
    }

    function addInteractabesHandlers(interactables)
    {

        let objectFormat = convertInteractables(interactables.children);


        objectFormat.MenuBtn.addEventListener("click",returnToMenu);
        objectFormat.generate.addEventListener("click",generateNew);
        objectFormat.solve.addEventListener("click",solve);

    }

    function boardHandler(e)
    {
        if(!GameManager.inGame())
        { // if not in game
            return ;
        }
        let eventTarget = e.target;
        let targetClass = eventTarget.className;

        if(targetClass === "Cell")
        { 
            let row = eventTarget.dataset.row;
            let col = eventTarget.dataset.col;

            let clickOutcome = GameManager.cellClick(row,col); // outcome Range : {"visualize","reset visualizion","success","invalid choice","win"}

            switch(clickOutcome)
            {
                case "visualize" :

                console.log("no visualization feature ");

                break;
                case "reset visualizion" :

                console.log("no visualization feature ");

                break;
                case "valid" :

                break;
                case "invalid" :

                break;
                case "win" :

                break;

                default :
                console.log("unexpected clickOutcome")
                break;

            }
        }


    }   

    function inputCtrHandler(e)
    {
        if(!GameManager.inGame())
        { // if not in game
            return ;
        }
        let eventTarget = e.target;
        let targetClass = eventTarget.className;
        if(targetClass === "input")
        { // if its a input child el
            // add choice in stata , toggle the active class ;
            GameManager.updateInputChoice(eventTarget.dataset.char);
            RenderManager.displayInputCtr(GameManager.getState());
        }
    }

    function returnToMenu()
    {
        RenderManager.updateDisplay(displayStates.menu);
        GameManager.updateState(displayStates.menu);
    }

    // last
    function generateNew()
    {

    }

    // 2nd last
    function solve()
    {
        
    }

    function displayGame()
    {
        RenderManager.displayBoard(GameManager.getState());
        RenderManager.displayInputCtr(GameManager.getState());
    }

    return {mainMenuHandler,gameMenuHandler};
})();
// ^^ returns a module which encapsulates all the event handlers and their respective data .

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

// every execution starts from events in js .
// the elements references should be contained inside their respective "elements" modules like MenuScreen
// so the pipelining or the execution of my code becomes : elementsModule - > eventsHandler - > stateTransitioning - > RenderManager ( uses elementsModule AND state ) and itself doesnt contain the actual elements 
// because everything is event-driven the eventHandler is resposible for knowing every high level functionality .


// the events handlers should be in another singleton which includes the handlers and nothing else .
// ^ or at the very least be in another container something like Handlers = {handler1 : handler(), ...};