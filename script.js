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

const inputDisplay = document.querySelector('#input-display');
// console.log(inputDisplay);
const listBtnDigits = document.querySelectorAll('.btn-digit');
// console.log(listBtnDigits);
const ARR_NUM_DIGITS = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

let strNumDisplay = '';

listBtnDigits.forEach((btnDigit, numIdx) => {
    // console.log(btnDigit.id);

    btnDigit.addEventListener('click', () => {
        // console.log(btnDigit.id[4]);
        inputDisplay.value += ARR_NUM_DIGITS[numIdx];
        strNumDisplay = inputDisplay.value;
        console.log(strNumDisplay);
    });
});

// num1 = 10;
// operator = '*'
// num2 = 5;

// console.log( operate(num1, '+', num2) ); // 15
// console.log( operate(num1, '-', num2) ); // 5
// console.log( operate(num1, operator, num2) ); // 50
// console.log( operate(num1, '/', num2) ); // 2