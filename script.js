const storedDisplay = document.querySelector('.stored');
const currentDisplay = document.querySelector('.current');
const buttons = document.querySelectorAll('button');

let storedValue = '';
let currentValue = '';
let operator = null;
const MAX_LENGTH = 15;

function formatNumber(number) {
    const num = +number;
    if (number.length > MAX_LENGTH) {
        return num.toExponential(2); 
    }
    return number;
}

function updateDisplay() {
    currentDisplay.textContent = formatNumber(currentValue);
    storedDisplay.textContent = operator ? `${formatNumber(storedValue)} ${operator} ` : formatNumber(storedValue);

}

function appendNumber(number) {
    if (number === '.' && currentValue.includes('.')) return;
    currentValue += number;
    updateDisplay();
}

function compute() {
    let computation;
    const prev = +storedValue;
    const current = +currentValue;
    switch (operator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '÷':
            computation = prev / current;
            break;
        case '%':
            computation = (prev / 100) * current;
            break;
    }
    currentValue = computation.toString();
    operator = null;
    storedValue = '';
    updateDisplay();
}

function chooseOperation(op) {
    if (currentValue === '') return;
    if (storedValue !== '') {
        compute();
    }
    operator = op;
    storedValue = currentValue;
    currentValue = '';
    updateDisplay();
}


function deleteNumber() {
    currentValue = currentValue.toString().slice(0, -1);
    updateDisplay();
}

function clear() {
    currentValue = '';
    storedValue = '';
    operator = null;
    updateDisplay();
}

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = button.textContent;

        if (button.className.includes('operand')) {
            appendNumber(value);
        } else if (button.className.includes('operation')) {
            chooseOperation(value);
        } else if (button.id === 'equals') {
            compute();
        } else if (button.id === 'del') {
            deleteNumber();
        } else if (button.id === 'ac') {
            clear();
        }
    });
});

function handleKeyPress(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber(key);
    } else if (key === '+') {
        chooseOperation('+');
    } else if (key === '-') {
        chooseOperation('-');
    } else if (key === '*') {
        chooseOperation('x');
    } else if (key === '/') {
        chooseOperation('÷');
    } else if (key === '%') {
        chooseOperation('%');
    } else if (key === 'Enter' || key === '=') {
        compute();
    } else if (key === 'Backspace') {
        deleteNumber();
    } else if (key === 'Escape') {
        clear();
    }
}

document.addEventListener('keydown', handleKeyPress);

clear();
