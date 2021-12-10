// --- Variables ---

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

// --- Logic And Methods ---

const calculator = {
    currentOperandText,
    previousOperandText,
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    },
    appendNumber(number) {
        //prevents from inserting more than one decimal point
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        }
        // prevents from appending a number to a computed result
        if (this.operation === '=') {
            this.clear();
        }
        this.currentOperand += number;
        // checks if currentOperand starts with 0 but is not a float number (0.) and cuts the first symbol (01 => 1 or 00 => 0)
        if (this.currentOperand[0] === '0' && this.currentOperand[1] !== '.' && this.currentOperand.length >= 2) {
            this.currentOperand = this.currentOperand.substring(1);
        }
        // checks if currentOperand starts with decimal point and adds 0 to the beggining (.1 => 0.1)
        else if (this.currentOperand === '.') {
            this.currentOperand = '0' + number;
        }
    },
    chooseOperation(operation) {
        // if we have previous and current operands and press operation button the result is computed
        if (this.previousOperand !== '' && this.currentOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        if (this.currentOperand !== '') {
            // if we have current operand and then press on operation button, current becomes previous, and resets
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        } else if (this.previousOperand !== '') {
            // if we already have previous operand and then press operation button, only line <this.operation=operation> runs,
            // which allows to change operations not changing previous operand
            return;
        } else {
            // if we do not have previous operand and then press operation button, previous becomes '0'
            this.previousOperand = '0';
        }
    },
    compute() {
        let result;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation) {
            case '+':
                result = prev + curr;
                break
            case '−':
                result = prev - curr;
                break
            case '×':
                result = prev * curr;
                break
            case '÷':
                result = prev / curr;
                break
            default:
                return;
        }
        this.currentOperand = result.toString();
        if (isNaN(this.currentOperand) || this.currentOperand == 'Infinity') {
            // doesn't allow to divide by zero or doesn't show NaN if something goes wrong
            this.clear();
        }
        this.previousOperand = '';
        this.operation = '=';
    },
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    },
    updateDisplay() {
        this.currentOperandText.innerText = this.currentOperand;
        if (this.operation != null && this.operation !== '=') {
            this.previousOperandText.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = this.previousOperand;
        }
    }
}

// --- Initialization ---

calculator.clear();

// --- Event Listeners ---

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})