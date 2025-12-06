const els =
{
    mainContainer_EL : document.querySelector(".main-ctr"),
    startBtn_EL : document.querySelector(".gamestateBtn"),
    stateTurn_EL : document.querySelector(".stateturn"),
    gameState_EL : document.querySelector(".Gamestate")
}

const map = 
{
    1 : "player",
    2 : "tie",
    3 : "computer"
}

const state =
{
    gameStarted : false,
    playerTurn : false,// false meaning computer's turn ; true meaning player's turn
    playerCharacter : "X",
    computerCharacter : "O",
    lastWon : null
}
let GameData = {
    board : [
  ["","",""],
  ["","",""],
  ["","",""]
],
Moves : 0,
} 

function init()
{
    els.startBtn_EL.addEventListener("click",startButtonClick)
}

function startButtonClick()
{
    if(!state.gameStarted)
    {//  if game has not started
        state.gameStarted = true;
        startGame();
    }else
    {
        alert("game has already started!");
    }
}

function startGame()
{
    GameData.board = [
  ["","",""],
  ["","",""],
  ["","",""]];
    if(state.lastWon !== null)
    { // then set character opposite to who won
    }else
    {
        state.playerTurn = (Math.floor(Math.random() * 4) > 2) ? true : false;
    }
    if(state.playerTurn)
    {
        els.stateTurn_EL.innerText = `Player ${state.playerCharacter}'s Turn`;
    }else
    {
        els.stateTurn_EL.innerText = `Computer ${state.computerCharacter}'s Turn`;        
    }
    els.gameState_EL.innerText = "game Started!";
}

function boxClicked(e)
{
    let row = +(e.target.attributes.data_row.value);
    let col = +(e.target.attributes.data_col.value);
    let value = +(e.target.attributes.data_value.value);
    
// //    console.log();
//    console.log(e);
//    console.log(row);
//    console.log(col);
    /*
    getInput(); // done
    addXorO(); // done
    checkWin();
    setLastWinifWin();
    ResetState();
    else
    changeTurn();
    */
    console.log(state);
    console.log(GameData);
    GameData.Moves++; // increment Moves
    // i couldve probably made a "currentCharacter" ;-;
   if(state.playerTurn)
   {
       GameData.board[row][col] = state.playerCharacter;
       e.target.innerText = state.playerCharacter;
        let win = CheckWin(); // 1 - > playerWin 2 - > tie 3 - > computerWin
                if(win === 4)
        { // then the game continues
            state.playerTurn = false;
            els.stateTurn_EL.innerText = `Computer ${state.computerCharacter}'s turn`;
        }else
        {
            displayWinner(win);
            resetState(win);
            els.stateTurn_EL.innerText = "Press Play to start";
        }
    }else
   {
       GameData.board[row][col] = state.computerCharacter;
       e.target.innerText = state.computerCharacter;
        let win = CheckWin(); // 1 - > playerWin 2 - > tie 3 - > computerWin
        if(win === 4)
        { // then the game continues
            state.playerTurn = true;
            els.stateTurn_EL.innerText = `Player ${state.playerCharacter}'s turn`;
        }else
        {
            displayWinner(win);
            resetState(win);
            els.stateTurn_EL.innerText = "Press Play to start";
        }
    }
}

function displayWinner(win)
{
    if(win === 1 || win === 3)
    {
        els.gameState_EL.innerText = `game Ended in ${map[win]}'s win`;
    }else
    {
        els.gameState_EL.innerText = `game Ended in a ${map[win]}`;
    }
}

function resetState(win)
{
    state.gameStarted = false;
    state.lastWon = map[win];
    GameData.Moves = 0;
    if(state.lastWon !== "player")
    {
        let temp = state.computerCharacter;
        state.computerCharacter = state.playerCharacter
        state.playerCharacter = temp;
        state.playerTurn = false;
    }else
    { // player gets to take first turn;
        state.playerTurn = true;
    }
    initBoxes();
    console.log(state);
}

function CheckWin()
{
    let gameEnded = false;
    if(GameData.Moves >= 9)
    {
        gameEnded = true;
    }
    if(state.playerTurn)
    { // if playerTurn then check only player's character;
        let win = CheckBoard(state.playerCharacter);
        if(!win && gameEnded)
        {
            return 2;
        }else if(win)
        {
            return 1;
        }else if(!gameEnded)
        {
            return 4;
        }
    }else
    {  // if current person Won then win = true; if !win and gameEnded then that means its adraw;
        let win =CheckBoard(state.computerCharacter);
        if(!win && gameEnded)
        {
            return 2;
        }else if(win)
        {
            return 3;
        }else if(!gameEnded)
        {
            return 4;
        }
    }
}
/*
  ["","",""],
  ["","",""],
  ["","",""]
*/

function CheckBoard(char) {
    const b = GameData.board;

    // Rows
    for (let r = 0; r < 3; r++) {
        if (b[r][0] === char && b[r][1] === char && b[r][2] === char) return true;
    }

    // Columns
    for (let c = 0; c < 3; c++) {
        if (b[0][c] === char && b[1][c] === char && b[2][c] === char) return true;
    }

    // Diagonals
    if (b[0][0] === char && b[1][1] === char && b[2][2] === char) return true;
    if (b[0][2] === char && b[1][1] === char && b[2][0] === char) return true;

    return false;
}


function initBoxes()
{
    els.mainContainer_EL.replaceChildren(); // replace all children with "nothing"
    for(let i =0;i < 3;i++)
    {
        const row = document.createElement("div");
        row.className = "row";
        row.id = `${i}`;
        els.mainContainer_EL.appendChild(row);
        for(let j = 0;j<3;j++)
        {
            const box = document.createElement("div");
            box.className = "box";
            box.id = `${i}-${j}`;
            box.setAttribute("data_row",i);
            box.setAttribute("data_col",j);
            box.setAttribute("data_value","");
            row.appendChild(box);
            box.innerText = "";
            
            // add clickevent listener
            box.addEventListener("click",(e)=>{
            if(state.gameStarted)
            {
                boxClicked(e);
            }
            });
        }
    }
}

init();
initBoxes();