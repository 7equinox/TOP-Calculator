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
const listBtnCalc = document.querySelectorAll('button');
// console.log(listBtnCalc);
const ARR_NUM_OP_VAL = [7, 8, 9, '*',
                        4, 5, 6, '/',
                        1, 2, 3, '+',
                        'clear', 0, '=', '-'];

let strDsplyCalc = '';

listBtnCalc.forEach((btnDigit, numIdx) => {
    // console.log(btnDigit.id);

    btnDigit.addEventListener('click', () => {
        // console.log(btnDigit.id[4]);
        switch(ARR_NUM_OP_VAL[numIdx]) {
            case '*':
            case '/':
            case '+':
            case '-':
                operator = ARR_NUM_OP_VAL[numIdx];
                break;
            case '=':
                // for (let i = 0; i < strDsplyCalc.length; i++) {
                //     console.log(typeof i);
                // }
                [ num1, num2 ] = strDsplyCalc.split(operator);
                // console.log("NUM1: " + num1);
                // console.log("OP: " + operator);
                // console.log("NUM2: " + num2);
                numResult = operate(Number(num1), operator, Number(num2));
                // console.log( numResult );
                inputDisplay.value = numResult;
                strDsplyCalc = '';
                operator = '';
                // console.log(strDsplyCalc);
                return;
            case 'clear':
                inputDisplay.value = '';
                strDsplyCalc = '';
                operator = '';
                // console.log(strDsplyCalc);
                return;
        }
        
        inputDisplay.value += ARR_NUM_OP_VAL[numIdx];
        strDsplyCalc = inputDisplay.value;
        // console.log(strDsplyCalc);
        // console.log("OP: " + operator);
    });
});

// num1 = 10;
// operator = '*'
// num2 = 5;

// console.log( operate(num1, '+', num2) ); // 15
// console.log( operate(num1, '-', num2) ); // 5
// console.log( operate(num1, operator, num2) ); // 50
// console.log( operate(num1, '/', num2) ); // 2