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

const inputDisplay = document.querySelector('#input-display');
// console.log(inputDisplay);
const listBtnCalc = document.querySelectorAll('button');
// console.log(listBtnCalc);
const ARR_CALC_BTN_VAL = [7, 8, 9, '*',
                        4, 5, 6, '/',
                        1, 2, 3, '+',
                        'clear', 0, '=', '-'];

let num1 = NaN;
let operator = '';
let num2 = NaN;

let strInput = '';

listBtnCalc.forEach((btnCalc, numIdx) => {
    // console.log(btnCalc.textContent);
    btnCalc.addEventListener('click', () => {
        const calcBtnVal = ARR_CALC_BTN_VAL[numIdx];
        // console.log(ARR_CALC_BTN_VAL[numIdx]);
        switch (calcBtnVal) {
            case 'clear':
                inputDisplay.value = '';
                num1 = NaN;
                operator = '';
                num2 = NaN;
                strInput = '';
                break;
            case '=':
                if (num1 !== strInput) {
                    num2 = Number(inputDisplay.value);
                }
                num1 = operate(num1, operator, num2);
                inputDisplay.value = num1;
                // operator = '';
                strInput = num1;
                break;
            case '*':
            case '/':
            case '+':
            case '-':
                if (operator !== '' && num1 !== strInput) {
                    num2 = Number(inputDisplay.value);
                    num1 = operate(num1, operator, num2);
                    inputDisplay.value = num1;
                }
                num1 = Number(inputDisplay.value);
                operator = calcBtnVal;
                strInput = '';
                break;
            default:
                if (operator !== '') {
                    inputDisplay.value = '';
                }
                inputDisplay.value += calcBtnVal;
                strInput += calcBtnVal;
        }
        console.log("=========================");
        console.log("inputDisplay.value = " + inputDisplay.value);
        console.log("num1 = " + num1);
        console.log("operator = " + operator);
        console.log("num2 = " + num2);
        console.log("strInput = " + strInput);
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
 *  Step 2: Click '+' <-- it must show 'click' effect
 *  Step 3: Click '3'
 *  Step 4: Click '=' <-- it must remove the 'click' effect of an operator
 */

/** MANUAL TEST #3
 *  Step 1: Click '2'
 *  Step 2: Click '+' <-- it must show 'click' effect
 *  Step 3: Click '3'
 *  Step 4: Click '=' <-- it must display 5 (2 + 3 = 5) and remove the 'click' effect of an operator
 *  Step 5: Click '4' <-- it must only show 4 in the display
 *  Step 6: Click '=' <-- it must display 7 (4 + 3 = 7)
 */

// or just imitate the logic of https://www.calculatorsoup.com/calculators/math/basic.php
// u can do pseudocode first...