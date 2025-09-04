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

function operate(num1, operator, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
    }
}

function checkRoundLongDeci(numOutput) {
    let strOutput = numOutput.toString();
    const strOutputParts = strOutput.split('.');

    if(strOutputParts.length > 1 &&
        strOutputParts[1].length > INT_MAX_DEC_PLACES) {
        strOutput = numOutput.toFixed(INT_MAX_DEC_PLACES);
        return parseFloat(strOutput);
    }
    return numOutput;
}

const inputDisplay = document.querySelector('#input-display');
const listBtnCalc = document.querySelectorAll('button');
const listBtnOprtr = document.querySelectorAll('.btn-operator');

const ARR_CALC_BTN_VAL = [
    7, 8, 9, '*',
    4, 5, 6, '/',
    1, 2, 3, '+',
    'clear', 0, '=', '-'
];
const ARR_DIGITS = [
    7, 8, 9,
    4, 5, 6,
    1, 2, 3,
    0
];
const ARR_OPERATORS = ['*', '/', '+', '-'];

const INT_MAX_DEC_PLACES = 8;

let num1 = NaN;
let operator = null;
let num2 = NaN;

let strLastClckVal = null;

listBtnCalc.forEach((btnCalc, numIdx) => {
    btnCalc.addEventListener('click', () => {
        const calcBtnVal = ARR_CALC_BTN_VAL[numIdx];

        switch (calcBtnVal) {
            case 'clear':
                inputDisplay.value = '';
                num1 = NaN;
                operator = null;
                num2 = NaN;
                strLastClckVal = null;

                listBtnOprtr.forEach(btnOperator => {
                    btnOperator.classList.remove('btn-clck');
                });
                
                console.clear();
                return;
                
            case '=':
                if (strLastClckVal === null) {
                    return;
                } else if (Number.isNaN(num1) || strLastClckVal === '=') { // 12 + 7 = 19 - 1 = 18 (but it goes = 19.. 1 - 7 = -6)
                    num1 = parseInt(inputDisplay.value);
                } else { // fix to align manual test case #3
                    num2 = parseInt(inputDisplay.value);
                }

                if (operator !== null && !Number.isNaN(num2)) {
                    num1 = operate(num1, operator, num2);
                }
                inputDisplay.value = checkRoundLongDeci(num1);

                listBtnOprtr.forEach(btnOperator => {
                    btnOperator.classList.remove('btn-clck');
                });
                break;

            case '*':
            case '/':
            case '+':
            case '-':
                if (operator !== null &&
                    ARR_DIGITS.includes(strLastClckVal)) {
                    num2 = parseInt(inputDisplay.value);
                    num1 = operate(num1, operator, num2);
                    inputDisplay.value = num1;
                }
                num1 = parseInt(inputDisplay.value);
                operator = calcBtnVal;
                
                listBtnOprtr.forEach(btnOperator => {
                    btnOperator.classList.remove('btn-clck');
                });
                btnCalc.classList.add('btn-clck');
                break;

            default:
                if (operator !== null &&
                    (ARR_OPERATORS.includes(strLastClckVal) ||
                    strLastClckVal === '=')) { // 12 + 13 (it comes 3 and not 13)
                    inputDisplay.value = '';
                }
                inputDisplay.value += calcBtnVal;
        }
        strLastClckVal = calcBtnVal;

        // console.log("=========================");
        // console.log("inputDisplay.value = " + inputDisplay.value);
        // console.log("num1 = " + num1);
        // console.log("operator = " + operator);
        // console.log("num2 = " + num2);
        // console.log("strLastClckVal = " + strLastClckVal);
    });
});

/** MANUAL TEST #1
 *  Step 1: Click '2'
 *  Step 2: Click '+' <-- it must not show + in the display
 *  Step 3: Click '3'
 *  Step 4: Click '=' <-- it must display 5 (2 + 3 = 5)
 *  Step 5: Click '=' again <-- it must display 8 (5 + 3 = 8)
 */

/** MANUAL TEST #2
 *  Step 1: Click '2'
 *  Step 2: Click '*' <-- it must show 'click' effect (operator = '*')
 *  Step 3: Click '- <-- it must change the 'click' effect into this (operator = '-')
 *  Step 3: Click '3'
 *  Step 4: Click '=' <-- it must remove the 'click' effect of an operator, it must display -1 (2 - 3 = -1)
 */

// or just imitate the logic of https://www.calculatorsoup.com/calculators/math/basic.php
// u can do pseudocode first...