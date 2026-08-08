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

function createBoard(difficulty = "")
{
    const NumberOfRowsOrCols = 3;
    
    let board = Array(9).fill(Array(9).fill(''));

    generateNew();


    function generateNew()
    {
        board = validSudoku;
    }

    function validChoice(row,col,char)
    {
        return false;
    }

    function isCellFilled(row,col)
    {
        if(board[row][col] !== '')
        {
            return true;
        }
        return false;
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

    return {generateNew,getBoard,getSize,validChoice,plot,isCellFilled};
}
// everything related to the baord is going to be stored in this object.

export default createBoard;