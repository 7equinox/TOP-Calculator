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

let strDsplyDigit = '';
let boolHasOperator = false;

listBtnCalc.forEach((btnDigit, numIdx) => {
    // console.log(btnDigit.id);

    btnDigit.addEventListener('click', () => {
        // console.log(btnDigit.id[4]);
        switch(ARR_NUM_OP_VAL[numIdx]) {
            case '*':
            case '/':
            case '+':
            case '-':
                if (operator === '') {
                    num1 = Number(strDsplyDigit);
                    console.log(strDsplyDigit);
                    strDsplyDigit = '';
                } else {
                    num2 = Number(strDsplyDigit);
                    // console.log("NUM1: " + num1);
                    // console.log("OP: " + operator);
                    // console.log("NUM2: " + num2);
                    num1 = operate(num1, operator, num2);
                    inputDisplay.value = num1;
                }
                // console.log(strDsplyDigit);
                operator = ARR_NUM_OP_VAL[numIdx];
                boolHasOperator = true;
                return;
            case '=':
                // for (let i = 0; i < strDsplyDigit.length; i++) {
                //     console.log(typeof i);
                // }
                // console.log(strDsplyDigit);
                num2 = Number(strDsplyDigit);
                num1 = operate(num1, operator, num2);
                console.log("NUM1: " + num1);
                console.log("OP: " + operator);
                console.log("NUM2: " + num2);
                // console.log( num1 );
                inputDisplay.value = num1;
                strDsplyDigit = num1;
                // TODO: Continue 7. Gotchas: watch out for and fix these bugs if they show up in your code: 
                operator = '';
                // console.log(strDsplyDigit);
                return;
            case 'clear':
                inputDisplay.value = '';
                strDsplyDigit = '';
                operator = '';
                // console.log(strDsplyDigit);
                return;
        }
        
        if(operator !== '' && boolHasOperator) {
            inputDisplay.value = '';
            boolHasOperator = false;
        }
        inputDisplay.value += ARR_NUM_OP_VAL[numIdx];
        strDsplyDigit = inputDisplay.value;
        console.log(strDsplyDigit);
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