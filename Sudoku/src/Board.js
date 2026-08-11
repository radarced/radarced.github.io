const validSudoku = [
  ['5', '3', '',  '',  '7', '',  '',  '',  ''],
  ['6', '',  '',  '1', '9', '5', '',  '',  '' ],
  ['',  '9', '8', '',  '',  '',  '',  '6', '' ],
  ['8', '',  '',  '',  '6', '',  '',  '',  '3'],
  ['4', '',  '',  '8', '',  '3', '',  '',  '1'],
  ['7', '',  '',  '',  '2', '',  '',  '',  '6'],
  ['',  '6', '',  '',  '',  '',  '2', '8', '' ],
  ['',  '',  '',  '4', '1', '9', '',  '',  '5'],
  ['',  '',  '',  '',  '8', '',  '',  '7', '9']
];
// const validSudoku = [
//   ['5', '3', '', '', '7', '8', '9', '1', '2'],
//   ['6', '', '2', '1', '9', '5', '', '4', '8'],
//   ['1', '9', '8', '', '', '2', '5', '6', ''],
//   ['8', '5', '', '7', '6', '1', '4', '', '3'],
//   ['4', '', '6', '8', '', '3', '7', '9', '1'],
//   ['7', '1', '3', '', '2', '4', '', '5', '6'],
//   ['', '6', '1', '5', '3', '', '2', '8', '4'],
//   ['2', '8', '', '4', '1', '9', '6', '', '5'],
//   ['3', '4', '5', '2', '8', '', '', '7', '9']
// ];



function createBoard(difficulty = "")
{
    const NumberOfRowsOrCols = 3;
    
let board = [];
for (let i = 0; i < 9; i++) {
    board.push(new Array(9).fill(''));
}
    
    let solutions = 0;

    let emptyCells;
    generateNew();

    let boardObj = {};

    function createEmptyBoard()
    {   
        board = [];
        
        for (let i = 0; i < 9; i++) {
            board.push(new Array(9).fill(''));
            }        
    }

    function generateNew()
    {
        // board = structuredClone(validSudoku);
        createEmptyBoard(); 

        generateDiagonalBadges();
        solveBoard();
        takeKunits_uniquely(25);
    }

    function takeKunits_uniquely(units)
    {
        let board1 = structuredClone(board); // to preserve the original 

        let cellsArray = []; // 1d array;

        for(let i = 0;i< 9;i++)
        {
            for(let j = 0;j < 9;j++)
            {
                let cell = {row : i,col : j};
                cellsArray.push(cell); 
            }
        }

        for(let i = 0;i< units;i++)
        { // choose a random cell - > cache it - > make it empty - > check if the solver finds more solutions than 1 - > if more than 1 then we put that back and try another random number NOT that particular number  , if only 1 unique solution then move to the next and next till we exit out of the loop
      
            let randomIndex = Math.floor(Math.random() * cellsArray.length);

            let randomPos = {
                row : cellsArray[randomIndex].row,
                col : cellsArray[randomIndex].col};
        
                board = structuredClone(board1);  
            
            let chosenCell = board[randomPos.row][randomPos.col];

            plot(randomPos.row,randomPos.col,''); // make it read for emptyCells
            
            emptyCells = getEmptyCells();
            plot(randomPos.row,randomPos.col,chosenCell); // replace it 
            solutions = 0;

            let isUnique = hasUniqueSolution(emptyCells[0],0); // this is the only missing piece now

            if(!isUnique)
            { // if removing the currentCell is impossible
                plot(randomPos.row,randomPos.col,chosenCell); // replace it 
                board1[randomPos.row][randomPos.col] = chosenCell; // sync the local copy of board with the original

                cellsArray.splice(randomIndex,1);

                i--; // go back an iteration because we did not remove a unit .
                continue;
            }else
            { // if it unique
                // then that means that its safe to remove the current cell

                board1[randomPos.row][randomPos.col] = '';

                cellsArray.splice(randomIndex,1);
                
            }            
        }
        
        board = structuredClone(board1);
    }

    function generateDiagonalBadges()
    {
        let startingPos = {row : 0,col : 0};
        
        for(let i = 0;i < 3;i++)
        {
            generateBadge(startingPos);
        startingPos.row += 3;        
        startingPos.col += 3;

        }

    }

    function generateBadge(startingPos)
    {
        
        let nums = ['1','2','3','4','5','6','7','8','9'];
        shuffle_arr(nums);

        for(let i = startingPos.row;i < startingPos.col + 3;i++)
            {
            for(let j = startingPos.col;j < startingPos.col + 3;j++)
            {
                let localRow = i % 3;
                let localCol = j % 3;

                let currentIndex = localRow * NumberOfRowsOrCols + localCol; // the 2d to 1d array transform formula 

                board[i][j] = nums[currentIndex];
            }
        }
        
    }

    function validChoice(row,col,char)
    {
        // check in the corresponding row if char exists .
        // check in the corresponding col if char exists .
        // check in the corresponding subgrid if char exists .
        // if all tests pass then we return true at the end .
        let currRow = board[row];

        for(let i = 0;i< 9;i++)
        {
            let currCell = currRow[i];
            if(currCell === char)
            {
                return false; // it exists already 
            }
        }
        for(let i = 0;i<9 ;i++)
        {
            let currRow = board[i];
            let currCell = currRow[col];
            if(currCell === char)
            {
                return false;
            }
        }
        let badgeInitialRow = Math.floor(row / 3) * 3;
        let badgeInitialCol = Math.floor(col / 3) * 3;

        for(let i = badgeInitialRow;i< badgeInitialRow + 3;i++)
        {
            for(let j = badgeInitialCol; j < badgeInitialCol + 3;j++)
            {
                let currCell = board[i][j];
                if(currCell === char)
                {
                    return false;
                }
            }
        }



        return true;
    }

    function isCellFilled(row,col)
    {
        if(board[row][col] !== '')
        {
            return true;
        }
        return false;
    }

    function isFilled()
    {
    for(let row of board)
        {
            let notFilled = row.some((cell)=> cell === '');
            if(notFilled)
            {
                return false; // if its false in ANY rows
            }
        }        

        return true;
    }

    
function getEmptyCells()
{
    let arr = [];
    for(let i =0;i < board.length;i++)
    {
        let currRow = board[i];
        for(let j = 0;j< currRow.length;j++)
        {
            let currCell = currRow[j];
            if(currCell === '')
            {
                arr.push({row : i,col : j});
            }
        }
    }
    return arr;
}

function solveBoard(displayFn)
{
    emptyCells = getEmptyCells();
    solve(emptyCells[0],0,displayFn);
}

function solve(cell,currentIndex,displayFn) // < -- takes a cell in 
{
    // console.log(cell);
    if(isFilled())
    {
        return "successfully solved";
    }
  
    let nums = [1,2,3,4,5,6,7,8,9];
    shuffle_arr(nums);

    // for(let i of nums)
    for(let i = 1;i <= 9;i++)
    {

        let currDigit = `${nums[i - 1]}`;

        if(validChoice(cell.row,cell.col,currDigit))
        {
            // plot it do the next iteration.
            plot(cell.row,cell.col,currDigit);
            
            let branchOutcome = solve(emptyCells[currentIndex + 1],currentIndex + 1,displayFn);
                // console.log(branchOutcome);
            
            if(branchOutcome === "successfully solved")
            {
                return branchOutcome;
            }else if(branchOutcome === "failure")
            {// backtrack! - > meaning reset the current Cell and continue
                // console.log(branchOutcome);
                plot(cell.row,cell.col,'');
                
                if(i === 9)
                { // the possiblities of the current cell have ended hence another backtrack 
                    return "failure";
                }
                continue;
            }
        }else
        { // we check what kind of failure was it? basically we check the amount of possible digits for the currentCEll
        // if the amount is more than 0 then we continue to the next iteration 
        let amountOfPossibleChoices = getChoices(cell.row,cell.col);

        if(amountOfPossibleChoices > 0)
        {
            if(i === 9)
            { // meaning we have tried every choice on the curentCell so backtrack 
                return "failure"; 
            }
            continue;
        }else
        {// backtrack
            // console.log("failure!");
            return "failure";
        }
        }
        
    }
    // console.log("outside");
}

function hasUniqueSolution(cell,currentIndex)
{  
    
    // console.log(cell);
    if(solutions > 1)
    {
        return false; // false meaning it does not have a unique solution!.
    }

    if(isFilled())
    {
        return "successfully solved";
    }
  
    let nums = [1,2,3,4,5,6,7,8,9];
    shuffle_arr(nums);

    // for(let i of nums)
    for(let i = 1;i <= 9;i++)
    {

        let currDigit = `${nums[i - 1]}`;

        if(validChoice(cell.row,cell.col,currDigit))
        {
            // plot it do the next iteration.
            plot(cell.row,cell.col,currDigit);
            
            let branchOutcome = solve(emptyCells[currentIndex + 1],currentIndex + 1);
                // console.log(branchOutcome);
            
            if(branchOutcome === "successfully solved")
            {
                solutions++;
                plot(cell.row,cell.col,'');
                plot(emptyCells[currentIndex + 1].row,emptyCells[currentIndex + 1].col,''); 
                
                if(i  === 9)
                { // backtrack
                    return "failure";
                }else
                {
                // reset the current cell + the following cells

                    continue; 
                }
            }else if(branchOutcome === "failure")
            {// backtrack! - > meaning reset the current Cell and continue
                // console.log(branchOutcome);
                plot(cell.row,cell.col,'');
                
                if(i === 9 && cell === emptyCells[0])
                { // we have CHECKED All possible hypothesis
                    break;
                }

                if(i === 9)
                { // the possiblities of the current cell have ended hence another backtrack 
                    return "failure";
                }
                continue;
            }else if(branchOutcome === false)
            { // we have found multiple solutions hence close the entire stack and return false 
                return false;
            }
        }else
        { // we check what kind of failure was it? basically we check the amount of possible digits for the currentCEll
        // if the amount is more than 0 then we continue to the next iteration 
        let amountOfPossibleChoices = getChoices(cell.row,cell.col);

        if(amountOfPossibleChoices > 0)
        {
            if(i === 9)
            { // meaning we have tried every choice on the curentCell so backtrack 
                return "failure"; 
            }
            continue;
        }else
        {// backtrack
            // console.log("failure!");
            return "failure";
        }
        }
        
    }

    if(solutions === 0)
    { // there is no solution at all so removing cells will not happen
        return false;
    }
    return true; // if we have passed all of the recursive calls then that means we found only one solution
}

function getChoices(row,col)
{
    let amount = 0;
    for(let i = 1;i<= 9 ;i++)
    {
        if(validChoice(row,col,`${i}`))
        {
            amount++;
        }
    }
    // console.log(amount);
    return amount;
}


    function plot(row,col,char)
    {
        board[row][col] = char;
    }

    function getBoard()
    {
        return board;
    }

    function getSize()
    {
        return NumberOfRowsOrCols;
    }

    boardObj = {generateNew,getBoard,getSize,validChoice,plot,isCellFilled,isFilled,solveBoard};
    return boardObj;
}
// everything related to the baord is going to be stored in this object.

function shuffle_arr(arr)
{
    for(let i = 0;i< arr.length;i++)
    {
        let temp = arr[i];
        let randomIndex = Math.floor(Math.random() * arr.length);

        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
        
    }
}

export default createBoard;