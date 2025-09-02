function add(addend1, addend2) {
    return addend1 + addend2;
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(multiplicand, multiplier) {
    return multiplicand * multiplier;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

let num1;
let operator;
let num2;

function operate(num1, operator, num2) {
    switch(operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
}

num1 = 10;
operator = '*'
num2 = 5;

console.log( operate(num1, '+', num2) ); // 15
console.log( operate(num1, '-', num2) ); // 5
console.log( operate(num1, operator, num2) ); // 50
console.log( operate(num1, '/', num2) ); // 2

/*
CONTINUE...
3. Create a new function operate that takes an operator and two numbers
and then calls one of the above functions on the numbers.
*/