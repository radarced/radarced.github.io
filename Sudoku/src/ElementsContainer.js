import { displayStates } from "./RenderManager.js";
import GameHtml from "./GameHTML.js"

let elementsCtr = (()=>{
    
    let mainContainer = document.querySelector(".main-container")
    let Board = getDomEl(GameHtml);


    let startMenu = {
        startBtn : document.querySelector(".play"),
    };

    function appendElements(curr_displayState)
    {
        switch(curr_displayState)
        {
            case displayStates.menu:
                mainContainer.appendChild(startMenu.startBtn);
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

            break;
            case displayStates.end :

            break;
        }
    }

    // GETTERS 
    function getMenuElemenets()
    {
        return startMenu;
    }

    function getGameElements()
    {
        return {a : "LOL this mehtod is not defined yet hahah got you "};
    }

    return {getMenuElemenets,getGameElements,removeElements,appendElements}
})()
// returns an object which contains the different displayStates elements inside each property as "objects" 
// which would be obtained by invoking the methods that the elementsCtr provides 

// this should return all DOM elements inside the HTMLString in an object .
// hence take all children of the body element loop over all of them and then put them in another object
function getDomEl(HTMLString)
{
    let newParser = new DOMParser();
    // 2. Parse the string into a detached HTML document
    const doc = newParser.parseFromString(HTMLString, 'text/html');

    console.dir(doc.body);
    // 3. Extract the created DOM element
    let element = doc.body.firstChild; 

console.log(element); // Output: <div class="card">...</div>
    return element;
}

export default elementsCtr;
