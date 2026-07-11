let selectors = {
    mainContainer : document.querySelector(".gameCtr"),
    playBtn : document.querySelector(".play"),
    turnText : document.querySelector(".turn"),
    EL_playerScore : document.querySelector(".playerScore"),
    EL_computerScore : document.querySelector(".computerScore")
}

// STATE ; pretend i dont know objects exist
let gameStarted = false;
let table = [[ '','','' ],[ '','','' ],[ '','','' ]];
let turn; // turnvalues ("player","player2")
let turnSymbol; // player is 'X' ; computer is 'O'
let number_turns = 0; // to track game end;

// win and score 
let gameResult; // this'll be a string representing either one of these values ("tie","player","computer")
let playerScore = 0;
let computerScore = 0;

function startGame()
{
    if(gameStarted)
    {
        alert("the game has already started!");
        return ;
    }
    gameStarted = true;
    // compute the first turn;
    let randomTurn = Math.floor(Math.random() * 1) + 1; // (1,2)
    turn = (randomTurn === 1) ? "player" : "player2";
    turnSymbol = (turn === "player") ? 'X' : 'O';
    
    renderInGameMenu();
}

function boxClick(event)
{
    if(!gameStarted)
    {
        return;
    }
    let classString = event.target.className; // string btw;
    let classes = classString.split(" "); // tbh the logic here should be in another function but oh well . 
    if(!(classes[0] === "box"))
    {
        console.log("you are not clicking any of the boxes");
        return ;
    }

    const currentBox = event.target;
    let boxClasses = classes; // boxClasses[0] represents 'box' and the number of the box from [0-2] same as rowClasses
    const currentRow = currentBox.parentElement; 
    let rowClasses = currentRow.className.split(" ");

    // row,col
    let row = +rowClasses[1];
    let col = +boxClasses[1];

    // check if its already done on that particular (row,col) if not then yes do it if yes then dont do it
    if(!(boxPlayed(row,col))) // if box is NOT CHECKED 
    {
        table[row][col] = turnSymbol; // for each move you update the table - > changeTurn - > compareWin - > if yes then stop - > if no then keep going 
        number_turns++;

        let gameEnded = compareWin(); // i put it above turns changing mechanisms to preserve the currentTurn 

        changeTurn();
        renderTable();
    

        if(gameEnded)
        { // if someone did win 
            renderResult();
            endGame();
            return ; 
        }

        renderTurn();
    }else
    {
        console.log("you clicked a checked box!");
        return ;
    }
    

}

// this modifies the endResult and returns a boolean representing whether or not the game has actually endeds
/*
a little note on compareWin() i understand that you shouldnt really need to check the last condition involving the 
currentTurn because we know that the currentTurn is going to be the one who's going to be winning in all conditions 
its not like X can play a move and O can win because of that but just to be explicit i added that in .
*/
function compareWin()
{
    let gameEnded = false;
    // ^^ this variable only cares about tie or win
    if(number_turns === 9)
    {
        gameEnded = true
    }

    // ROW CHECK
    for(let i = 0;i < 3;i++)
    {
       let currentRow = table[i];
       if(currentRow[0] === currentRow[1] && currentRow[1] === currentRow[2] && currentRow[1] === turnSymbol)
       { // whoever's turn it is he won
        gameEnded = true;
        gameResult = turn;
       }
    }

    // COLUMN CHECK
    for(let j = 0;j < 3;j++)
    {
        if(table[0][j] === table[1][j] && table[1][j] === table[2][j] && table[1][j] === turnSymbol)
        {
            gameEnded = true;
            gameResult = turn;
        }
    }

    // DIAGONAL CHECK
    if(table[0][0] === table[1][1] && table[1][1] === table[2][2] && table[1][1] === turnSymbol 
      || table[0][2] === table[1][1] && table[1][1] === table[2][0] && table[1][1] === turnSymbol  
    )
    {
        gameEnded = true;
        gameResult = turn;
    }

    // tie CHECK
    if(gameEnded && gameResult !== turn)
    {
        gameResult = "tie";
    }

    return gameEnded;
}

function changeTurn()
{
    turn = (turn === "player") ? "player2" : "player"; // if player then turn to computer if not player(computer) then turn to player
    turnSymbol = (turnSymbol === 'X') ? 'O' : 'X';
}

// this will be invoked ONLY when the game HAS ended ; so yeah feel free to use the variables that are applicable only after games cessation to existence
function renderResult()
{
    switch(gameResult)
    {
        case "tie" :
        selectors.turnText.textContent = "It's a tie!";
        break;

        case "player":
        playerScore++;
        selectors.turnText.textContent = "player won!";
        
        break;
        
        case "player2":

        computerScore++;
        selectors.turnText.textContent = "player2 won!";
        
        break;
        default :
        alert("the result is funky");
        break;
    }
}

function endGame()
{
    alert("Game ended!");
    number_turns = 0;
    gameStarted = false;
    selectors.playBtn.textContent = "Play";
    gameResult = null;
    table = [[ '','','' ],[ '','','' ],[ '','','' ]];
    renderTable(); // so that it becomes empty again;
    renderScore();
}

// ig you can just check directly for '' but whatever this works as well
function boxPlayed(row,col)
{
    if(table[row][col] === 'X' || table[row][col] === 'O')
    {
        return true;
    }
    return false;
}

function renderTurn()
{
    selectors.turnText.textContent = `${turn}'s turn`;
}   

function renderScore()
{
    selectors.EL_playerScore.textContent = `Player Score : ${playerScore}`;
    selectors.EL_computerScore.textContent = `player2 Score : ${computerScore}`;
}

function renderTable()
{ // we're gonna map the table array to our dom table element
    for(let i = 0; i < 3;i++)
    {
        for(let j = 0;j < 3;j++)
        {
            let currentSymbol = table[i][j];
            let currentBox = getBox(i,j);
            currentBox.textContent = currentSymbol;
        }
    }
}

// get functions ; the following returns the html node which represents a box 
function getBox(row,col)
{
    let children = selectors.mainContainer.children;
    let currentRow,currentBox;

    // find row and then box;
    for(let i = 0;i < children.length; i++)
    {
        if(children[i].className === `row ${row}`)
        {
            currentRow = children[i].children;
        }
    }
    for(let j = 0;j < currentRow.length;j++)
    {
        if(currentRow[j].className === `box ${col}`)
        {
            currentBox = currentRow[j];
        } 
    }
    return currentBox;
}


// ALL STARTING FUNCTIONS 
function attachEventListeners()
{
    selectors.playBtn.addEventListener("click",startGame);
    selectors.mainContainer.addEventListener("click",boxClick);
}

 
function populateContainer()
{
 for(let i = 0;i < 3;i++)
 {
    let row = document.createElement("div");
    row.classList.add("row",`${i}`);
    selectors.mainContainer.appendChild(row);
    for(let j = 0;j < 3;j++)
    {
        let box = document.createElement("div");
        box.classList.add("box",`${j}`);
        row.appendChild(box);
    }
 }
}

function renderInGameMenu()
{
    selectors.playBtn.textContent = "In game";
    renderTurn();
}


populateContainer();
attachEventListeners();
// all the trash render random dom calls would be 
// at the bottom