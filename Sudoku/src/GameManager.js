import createBoard from "./Board.js";

const displayStates = {
    menu : "menuState",
    game : "gameState",
    end : "endMenuState",
} // the possible displayStates ; now that i think about it renderState , gameState will be the same across all "states" so its better to be generic cuz its just redundant to hold 2 different variables that tell the same thing .


// new board Generation also just means that the game has started
// this is a singleton ; each time a game starts create a new board;
let GameManager = (()=>{
    let gameState = {
        board : null,
        inputChoice : ' ',
    };
    
    // i dont think i will be using the displayStates just gameRunning is fine because gameManager should only care about the "gameStates" which can either be true or false which entails the gameRunning variable 

    let gameRunning = false;

    function updateState(state_toSwitch)
    {
        // state = state_toSwitch;
        if(state_toSwitch !== displayStates.game)
        { // if we're switching to something NOT gameState then game is not running so append it to the var
            gameRunning = false;
        }
        if(state_toSwitch === displayStates.menu)
        {
            delete gameState.board;
        }
    }

    function getState()
    {
        return gameState;
    }

    function startGame()
    {
        gameState.board = createBoard();
        gameState.inputChoice = ' ';

        // gameRunning is the variable which tells us whether the game is Running or not ;
        gameRunning = true;
    }

    // 4 outcomes : valid_number,invalid_number,nothing,numberVisualizer

    function cellClick(row,col)
    {
        if(gameState.board.isCellFilled(row,col))
        { // this is the numberVisualizer outcome of the "click" event
            return "visualize";
        }
        
        if(gameState.inputChoice === ' ')
        { // this is the nothing outcome ; aka the user hasnt picked an input choice
            // because user clicked a non - filled cell all visualizers will be reset .
            return "reset visualizion";
        }

        let valid = gameState.board.validChoice(+row,+col,gameState.inputChoice);
        
        if(valid)
        {
            // plot - > check Win - > gameRunning - > return "win" 
            gameState.board.plot(row,col,gameState.inputChoice);
            
            // if the board is completed
            if(checkWin())
            {
                gameRunning = false;
                return "win";
            }

            return "valid";
        }else
        { // do a little animation
            return "invalid";
        }
    }

    function solveBoard(displayFn)
    {
        gameState.board.solveBoard(displayFn);
    }

    function reset()
    {
        gameState.board = null;
        gameState.inputChoice = ' ';
    }

    function updateInputChoice(char)
    {
        gameState.inputChoice = char;
    }

    function inGame()
    {
        return gameRunning;
    }
    
    function checkWin()
    { 
        return gameState.board.isFilled();
    }

    return {updateState,getState,startGame,inGame,updateInputChoice,cellClick,solveBoard};
})();

export default GameManager;