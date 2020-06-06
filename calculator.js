let displayValue = document.querySelector('.display-text');
let historyValue = document.querySelector('.history-text');
let operation = '';
let total = '0';
let currentValue = '0';
let maxLength = 11;

let clear = document.getElementById('clear');
clear.addEventListener("click", (e) => {
    displayValue.innerHTML = '';
    historyValue.innerHTML = '';
    total = '0';
    currentValue = '0';
    operation = '';
});

let backspace = document.getElementById('backspace');
backspace.addEventListener('click', (e) => {
    displayValue.innerHTML = displayValue.innerHTML.slice(0, displayValue.innerHTML.length - 1);
    currentValue = displayValue.innerHTML;
});

const numbers = document.querySelectorAll('.number');
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        if (!displayValue.innerHTML || operation === '=') {
            displayValue.innerHTML = number.id;
            if (operation === '=') {
                operation = '';
            }
        } else {
            displayValue.innerHTML += number.id;
            if (displayValue.innerHTML.length > maxLength) {
                displayValue.innerHTML = 'Infinity';
            }
        }
        currentValue = displayValue.innerHTML;
    });
});

let getOperator = document.querySelectorAll('.operator');
getOperator.forEach((operator) => {
    operator.addEventListener('click', (e) => {
        if (currentValue) {
            updateTotal();
            operation = operator.innerHTML;
            if (operation === '=') {
                historyValue.innerHTML = ''
                displayValue.innerHTML = total;
                currentValue = total;
            } else {
                historyValue.innerHTML = `${total} ${operation}`;
                // reset values
                displayValue.innerHTML = '';
                currentValue = '0';
            }
        }
    });
});

function operate(operator, a, b) {
    switch (operator) {
        case '+': return parseFloat(a) + parseFloat(b);
        case '-': return parseFloat(a) - parseFloat(b);
        case '×': return parseFloat(a) * parseFloat(b);
        case '÷': {
            if (b === '0') displayValue.innerHTML = 'Infinity'

            return parseFloat(a) / parseFloat(b);
        }
    }
}

function updateTotal() {
    if (operation && operation != '=') {
        total = operate(operation, total, currentValue);
    } else {
        total = currentValue;
    }
}

let plusminus = document.getElementById('plus-minus');      // negates current value
plusminus.addEventListener('click', (e) => {
    currentValue *= -1;
    displayValue.innerHTML = currentValue;
});

let decimal = document.getElementById('decimal');
decimal.addEventListener('click', (e) => {
    if (!displayValue.innerHTML.includes('.')) {
        displayValue.innerHTML += e.target.textContent;
    }
}) 

