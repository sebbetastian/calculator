class Calculator {
    constructor(calcOperand, calcOperandTheSecond) {
        this.calcOperand = calcOperand
        this.calcOperandTheSecond = calcOperandTheSecond
        this.clear()
    }
    clear() {
        this.Operand = ''
        this.calcOperandTheSecond = ''
        this.operation = undefined
    }
    appendNumber(number) {
        if (number === '.' && this.Operand.includes('.')) return
        this.Operand = this.Operand.toString() + number.toString()
    }
    chooseOperation(operation) {
        if (this.Operand === '') return
        if (this.calcOperandTheSecond !== '') {
        this.compute()
        }
        this.operation = operation
        this.calcOperandTheSecond = this.Operand
        this.Operand = ''
    }
    compute() {
       let calcResult = '';
       const prev = parseFloat(this.calcOperandTheSecond);
       const current = parseFloat(this.Operand);
       if (isNaN(prev) || isNaN(current)) return
       switch (this.operation) {
            case '+':
               calcResult = prev + current
               break
            case '-':
                calcResult = prev - current
                break
            case 'X':
                calcResult = prev * current
                break
            case '%':
                calcResult = prev / current
                break
            default:
                this.clear()
       }
       this.clear();
       this.Operand = calcResult;
       console.log(calcResult);
    }
    updateDisplay() {
        this.calcOperand.innerText = this.Operand
        if (this.operation != null ) {
            return this.calcOperand.innerText = `${this.calcOperandTheSecond } ${this.operation} ${this.Operand}`;
        }
    }
}

const calcOperand = document.querySelector('[data-current-operand]')
const calcOperandTheSecond = document.querySelector('[data-second-operand]')
const calcButtons = document.querySelectorAll('[data-number]');
const calcOperations = document.querySelectorAll('[data-operation]');
const calcEqual = document.querySelector('[data-equals]');
const calcAC = document.querySelector('[data-all-clear]');

const calculator = new Calculator(calcOperand, calcOperandTheSecond);

calcButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

calcOperations.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

calcEqual.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

calcAC.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});