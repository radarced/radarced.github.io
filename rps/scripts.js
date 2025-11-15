/*
- make random effects on lose like spam random HAHa images on everywhere on the screen 
- make random effects on win like giving a trophy and then suddenly tearing apart and haha images again
*/
const gamestateBtn = document.getElementById("b");
const displayState = document.getElementById("c");
const choices = document.querySelectorAll(".choice");

// scoreels + scores
const playerScore = document.querySelector(".player-score");
const computerScore = document.querySelector(".computer-score");
let player_score = 0;
let computer_score = 0;

// ChooseEls
const PlayerChoose = document.querySelector(".human-choose");
const ComputerChoose = document.querySelector(".computer-choose");

let gameState = 0; // 0 meaning lobby 1 meaning in game

choices.forEach(choice => {
    choice.addEventListener("click",()=>
    {
        if(gameState === 1)
        { // meaning we're in game
            console.log(choice);
            /*
            getInput(); 
            getRandChoice();
            ShowChoice();
            Compare();
            DeclareWinner();
            Display();
            Reset();
            */
           let HumanChoice = getInput(choice.id); // i couldve done +choice.id but oh well
           let ComputerChoice = Math.floor(Math.random()*2) + 1;// [0-2] + 1 = [1,3]
           ShowChoice(HumanChoice,ComputerChoice);
           let windeduction = Compare(HumanChoice,ComputerChoice); // 1 : player 2 : tie 3 : computer
           DeclareWinner(windeduction);
           Display(windeduction);
           Reset();
        }
    })
});

gamestateBtn.addEventListener("click",()=>{
    if(gameState === 0)
    { // meaning we're still in lobby - > startGame()
        startGame();
    }else
    {
        alert("you are already in game;");
    }
})

function startGame()
{
displayState.innerText = "pick a choice (rocks,papers,scissors)";
gamestateBtn.innerText = "game Has Started";
gameState = 1;
}

function getInput(choiceId)
{
    switch(choiceId)
    {
        case "1":
            return 1;
            break;
        case "2":
            return 2;
            break;
        case "3":
            return 3;
            break;
        default :
            alert("what is the id of the choice els?"); 
        break;
    } 
}

function DeclareWinner(windeduction)
{
    if(windeduction === 1)
    {
        player_score++;
        playerScore.innerText = `player score : ${player_score}`;
    }
    else if(windeduction === 3)
    {
        computer_score++;
        computerScore.innerText = `computer score : ${computer_score}`;
    }
}

function Display(windeduction)
{
    if(windeduction === 1)
    {
        displayState.innerText = "You Won!";
    }else if(windeduction === 2)
    {
        displayState.innerText = "Its a tie!";
    }else if(windeduction === 3)
    {
        displayState.innerText = "You Lost!";
    }
}

function Reset()
{
    gamestateBtn.innerHTML = "play again?";
    gameState = 0;
}

/*
1 = rock , 2 = paper , 3 = scissors;
1 = player_win, 2 = tie , 3 = computer_win
*/
function Compare(PlayerChoice,ComputerChoice)
{
    if(PlayerChoice === ComputerChoice)
    {
        return 2;
    }

    if((PlayerChoice === 1 && ComputerChoice === 3)||
     (PlayerChoice === 2 && ComputerChoice === 1) || 
    (PlayerChoice === 3 && ComputerChoice === 2))
    {
        return 1;
    }
    return 3;
}

function ShowChoice(HumanChoice,ComputerChoice)
{
    let Human_ch_String = ConvertCh_string(HumanChoice);
    let Computer_ch_String = ConvertCh_string(ComputerChoice);
    
    PlayerChoose.innerHTML = `You Chose : ${Human_ch_String}`;
    ComputerChoose.innerHTML = `Computer Chose : ${Computer_ch_String}`;
}

function ConvertCh_string(number)
{
    switch(number)
    {
        case 1 :
            return "Rocks"
        case 2 :
            return "Paper"
        case 3 :
            return "Scissors"
        default :
            return "Invalid choice?"
    }
}