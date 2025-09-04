const inputDisplay = document.querySelector('#input-display');
const divErrorMsg = document.querySelector('#error-msg');
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

// Function to prevent overflow in the display
function checkRoundLongDeci(numOutput) {
    let strOutput = numOutput.toString();
    const strOutputParts = strOutput.split('.');

    // If whole number
    const boolIsFloatNum = strOutputParts.length === 2;
    if (!boolIsFloatNum) {
        return numOutput;
    }

    // Round the numbers if long decimal
    const boolHasLongDeci = strOutputParts[1].length > INT_MAX_DEC_PLACES;
    if (boolHasLongDeci) {
        strOutput = numOutput.toFixed(INT_MAX_DEC_PLACES);
    }
    return parseFloat(strOutput);
}

function clearDisplayAndData() {
    inputDisplay.value = '0';
    divErrorMsg.textContent = '';
    console.clear();
    num1 = NaN;
    operator = null;
    num2 = NaN;
    strLastClckVal = null;
}

function removeBtnClckEffect() {
    listBtnOprtr.forEach(btnOperator => {
        btnOperator.classList.remove('btn-clck');
    });
}

function handleInvalidOutput() {
    if (num1 === Infinity) {
        inputDisplay.value = 'undefined';
        divErrorMsg.textContent = `
            [ERROR] You cannot divide it by zero.
        `;
    } else {
        inputDisplay.value = checkRoundLongDeci(num1);
    }
}

listBtnCalc.forEach((btnCalc, numIdx) => {
    btnCalc.addEventListener('click', () => {
        const calcBtnVal = ARR_CALC_BTN_VAL[numIdx];

        switch (calcBtnVal) {
            case 'clear':
                removeBtnClckEffect();
                clearDisplayAndData();
                return;
                
            case '=':
                removeBtnClckEffect();

                if (num1 === Infinity || // Undefined output
                    strLastClckVal === null || // Invalid (only clicks '=')
                    ARR_OPERATORS.includes(strLastClckVal)) {
                    return;
                } else if (Number.isNaN(num1) || // Only input 1st num then '='
                           strLastClckVal === '=') { // Calc output & 2nd num
                    num1 = parseFloat(inputDisplay.value);

                } else { // Operate 1st input number with 2nd input number
                    num2 = parseFloat(inputDisplay.value);
                }

                if (operator !== null && // Include operation sign
                    !Number.isNaN(num2)) { // Defined 2nd input number
                    num1 = operate(num1, operator, num2);
                }
                handleInvalidOutput();
                break;

            case '*':
            case '/':
            case '+':
            case '-':
                removeBtnClckEffect();
                
                // Undefined output
                if (num1 === Infinity) {
                    return;
                }

                btnCalc.classList.add('btn-clck');

                // Evaluate more than a single pair of numbers at a time
                if (operator !== null &&
                    ARR_DIGITS.includes(strLastClckVal) &&
                    !Number.isNaN(num1)) {
                    num2 = parseFloat(inputDisplay.value);
                    num1 = operate(num1, operator, num2);
                    handleInvalidOutput();
                }
                num1 = parseFloat(inputDisplay.value);
                operator = calcBtnVal;
                break;

            default:
                // Undefined output
                if (num1 === Infinity) {
                    return;
                }

                // Start new calc when a result is displayed & press new digit
                if (strLastClckVal === '=') {
                    clearDisplayAndData();
                }

                // Display the number given an operator is picked
                if ((operator !== null &&
                    ARR_OPERATORS.includes(strLastClckVal)) ||
                    // Prevent leading zeroes
                    inputDisplay.value === '0') {
                    inputDisplay.value = '';
                }

                inputDisplay.value += calcBtnVal;
        }
        strLastClckVal = calcBtnVal;

        console.log("=========================");
        console.log("inputDisplay.value = " + inputDisplay.value);
        console.log("num1 = " + num1);
        console.log("operator = " + operator);
        console.log("num2 = " + num2);
        console.log("strLastClckVal = " + strLastClckVal);
    });
});

// Always start fresh in the website
clearDisplayAndData();

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

// MANUAL TEST #3: 12 + 7 = 19 - 1 = 18
// MANUAL TEST #4: 12 + 7 - 1 = 18
// MANUAL TEST #5: 12 + 13 = 25

// Guide: https://www.calculatorsoup.com/calculators/math/basic.php