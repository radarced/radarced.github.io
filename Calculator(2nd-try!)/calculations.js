
// STATE looks like so  
// const state = {
//     pointer : NUM1_POS, // {num1Pos,opPos,num2Pos}
//     num1 : num, // defaultValue = ''; this'll be the number dataType
//     op : 'op', // defaultValue = ''; this'll be the string dataType
//     num2 : num, // defaultValue = ''; this'll be the number dataType
//     result : "", // this stores the entire expression as a string like 4 * 3 = 12;
//     oldResult : false, // this is a variable used as a condition to display the result or not.
// }


// e.g =>  expression = {num1 : 4,op : '+',num2 : 5}; return result(5);
// we only care about {num1,op,num2} and returning a result back
export function evaluate(expression)
{ 
    let result;
    switch(expression.op)
    {
        case '+' :
        result = add(expression.num1,expression.num2);
        break;
        case '-' :
        result = subtract(expression.num1,expression.num2);

        break;
        case '*' :
        result = multiply(expression.num1,expression.num2);

        break;
        case '/' :
        result = divide(expression.num1,expression.num2);

        break;
        case '%' :
        result = modulus(expression.num1,expression.num2);

        break;
    }
    console.log(typeof result);
    return result;
}

function add(a,b)
{
    return a + b;
}

function multiply(a,b)
{
    return a * b;
}

function divide(a,b)
{
    return a / b;
}

function modulus(a,b)
{
    return a % b;
}

function subtract(a,b)
{
    return a - b;
}