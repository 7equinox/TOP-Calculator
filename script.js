const inputDisplay = document.querySelector('#input-display');
const divErrorMsg = document.querySelector('#error-msg');
const listBtnCalc = document.querySelectorAll('button');
const listBtnOprtr = document.querySelectorAll('.btn-operator');
const btnDecimal = document.querySelector('.btn-decimal');

const ARR_CALC_BTN_VAL = [
    'clear', 'backspace',
    7, 8, 9, '*',
    4, 5, 6, '/',
    1, 2, 3, '+',
    '.', 0, '=', '-'
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
    btnDecimal.disabled = false;
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

// Function to let only one decimal point
function toggleBtnDecimal() {
    if (inputDisplay.value.includes('.')) {
        btnDecimal.disabled = true;
    } else {
        btnDecimal.disabled = false;
    }
}

// Function to handle the main logic of the system
function handleCalcButtons({
    btnCalc = null,
    numIdx = NaN,
    calcBtnVal = null
}) {
    // If key pressed is not given, handle click events
    if (calcBtnVal === null) {
        calcBtnVal = ARR_CALC_BTN_VAL[numIdx];
    }

    switch (calcBtnVal) {
        case 'clear':
            removeBtnClckEffect();
            clearDisplayAndData();
            return;
        
        case 'backspace':
            // Start new calc when a result is displayed & press backspace
            if (strLastClckVal === '=') {
                clearDisplayAndData();
            }

            // Keep default display value '0' if empty
            if (inputDisplay.value !== '0') {
                inputDisplay.value = inputDisplay.value.slice(0, -1);
                if (inputDisplay.value === '') {
                    inputDisplay.value = '0';
                }
                toggleBtnDecimal();
            }
            break;

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
            toggleBtnDecimal();
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

            // If key pressed, use button operator nodelist element
            if (btnCalc === null) {
                listBtnOprtr.forEach(btnOperator => {
                    if ((btnOperator.textContent === '×' &&
                        calcBtnVal === '*') ||
                        btnOperator.textContent === calcBtnVal) {
                        btnOperator.classList.add('btn-clck');
                    }
                });
            } else {
                btnCalc.classList.add('btn-clck');
            }
            
            // Evaluate more than a single pair of numbers at a time
            if (operator !== null &&
                ARR_DIGITS.includes(strLastClckVal) &&
                !Number.isNaN(num1)) {
                num2 = parseFloat(inputDisplay.value);
                num1 = operate(num1, operator, num2);
                handleInvalidOutput();
                toggleBtnDecimal();
            }
            num1 = parseFloat(inputDisplay.value);
            operator = calcBtnVal;
            btnDecimal.disabled = false;
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

            // Display another number given an operator is picked
            if (ARR_DIGITS.includes(calcBtnVal) &&
                ((operator !== null &&
                ARR_OPERATORS.includes(strLastClckVal)) ||
                // Prevent leading zeroes
                inputDisplay.value === '0')) {
                inputDisplay.value = '';
            } else if (calcBtnVal === '.' && (
                operator !== null &&
                ARR_OPERATORS.includes(strLastClckVal))) {
                inputDisplay.value = '0';
            }

            // Only allowed one decimal point
            if (calcBtnVal === '.' && !btnDecimal.disabled) {
                btnDecimal.disabled = true;
                inputDisplay.value += calcBtnVal;
            }
            if (calcBtnVal === '.' && btnDecimal.disabled) {
                break;
            }
            inputDisplay.value += calcBtnVal;
    }
    strLastClckVal = calcBtnVal;
}

// Event listener for clicking buttons
listBtnCalc.forEach((btnCalc, numIdx) => {
    btnCalc.addEventListener('click', () => {
        handleCalcButtons({ btnCalc, numIdx });
        btnCalc.blur();
    });
});

// Event listener for keyboard support
document.addEventListener('keyup', (event) => {
    const eventKeyup = event.key.toLowerCase();

    switch (eventKeyup) {
        case 'delete':
            handleCalcButtons({ calcBtnVal: 'clear' });
            break;

        case 'backspace':
            handleCalcButtons({ calcBtnVal: 'backspace' });
            break;

        case '=':
        case 'enter':
            handleCalcButtons({ calcBtnVal: '=' });
            break;

        case '*':
        case '/':
        case '+':
        case '-':
        case '.':
            handleCalcButtons({ calcBtnVal: eventKeyup });
            break;

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            handleCalcButtons({ calcBtnVal: parseInt(eventKeyup) });
    }

    // For clicking effect buttons
    listBtnCalc.forEach((btnCalc) => {
        const boolHasPressDel = btnCalc.textContent === 'Clear' &&
                                eventKeyup === 'delete';
        const boolHasPressBckspc = btnCalc.textContent === 'Backspace' &&
                                eventKeyup === 'backspace';
        const boolHasPressEnter = btnCalc.textContent === '=' &&
                                eventKeyup === 'enter';
        const boolHasPressAstrsk = btnCalc.textContent === '×' &&
                                eventKeyup === '*';
        if (boolHasPressDel ||
            boolHasPressBckspc ||
            boolHasPressEnter ||
            boolHasPressAstrsk ||
            btnCalc.textContent === eventKeyup) {
                btnCalc.classList.add('button-hover');
                btnCalc.classList.add('button-active');
            setTimeout(() => {
                btnCalc.classList.remove('button-hover');
                btnCalc.classList.remove('button-active');
            }, 300);
        }
    });
});

// Disable right click inside the website
document.addEventListener("contextmenu", (eventMouse) => {
    eventMouse.preventDefault()
});

// Disable copy and cut inside the website
document.addEventListener("copy", (eventClip) => {
    eventClip.preventDefault()
});
document.addEventListener("cut", (eventClip) => {
    eventClip.preventDefault()
});

// Always start fresh in the website
clearDisplayAndData();

// Make input text not editable
inputDisplay.readOnly = true;