const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
let currentOperand;
let previousOperand;
let operation;

const clear = () => {
    currentOperandTextElement.innerText = currentOperand = '';
    previousOperandTextElement.innerText = previousOperand = '';
    operation = '';
}

const addition = (x, y) => {
    return (Number(x) + Number(y)).toString();
}

const substraction = (x, y) => {
    return (Number(x) - Number(y)).toString();
}

const multiplication = (x, y) => {
    return (Number(x) * Number(y)).toString();
}

const division = (x, y) => {
    return (Number(x) / Number(y)).toString();
}

clear();

for (let numButton of numberButtons) {
    numButton.addEventListener('click', () => {
        if (operation === '=') {
            clear();
        }
        currentOperand += numButton.innerText;
        currentOperandTextElement.innerText = currentOperand;
    })
}

allClearButton.addEventListener('click', () => {
    clear();
})

for (let operButton of operationButtons) {
    if (currentOperand === '') return;
    operButton.addEventListener('click', () => {
        operation = operButton.innerText;
        previousOperandTextElement.innerText = `${currentOperand} ${operation}`;
        previousOperand = currentOperand;
        currentOperand = '';
    })
}

equalsButton.addEventListener('click', () => {
    if (operation === '+') {
        currentOperand = addition(previousOperand, currentOperand);
    } if (operation === '−') {
        currentOperand = substraction(previousOperand, currentOperand);
    } if (operation === '×') {
        currentOperand = multiplication(previousOperand, currentOperand);
    } if (operation === '÷') {
        currentOperand = division(previousOperand, currentOperand);
    }
    previousOperand = '';
    currentOperandTextElement.innerText = currentOperand;
    previousOperandTextElement.innerText = '';
    operation = '=';
})