export const add = function(a,b) {
	return a + b; // return value; parameters and arguments
};

export const subtract = function(a,b) {
	return a - b;
};

export const sum = function(arr) {
	let total;
  for(let i of arr)
  {
    total += i;
  }return total;
};

export const multiply = function(arr)
{
  let a =1;
  for(let num of arr)
  {
    a*= num;
  }
  return a;
};

export const power = function(a,b) { // a raised to the power of b
  return Math.pow(a,b);
};

export const factorial = function(a) {
	// so if 9 multiply 9 by 8 then multiply the result by 7 then multiply by the result by 6 and so on;
  let result = 1;
  while(a > 1)
  {
    result*=a;
    a--;
  }
  return result;
};

export const divide = function(a,b)
{
  if(b === 0)
  {
    alert("cannot divide by 0!");
    return null; 
  }else
  {
    return a / b;
  }
}

export const modulus = function(a,b)
{
  if(a === 0 && a=== b)
  {
    alert("Undefined expression 0 mod 0");
    return null;
  }
  return a % b;
}