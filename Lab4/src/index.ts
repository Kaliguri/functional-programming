type CalcOperation = (a: number, b?: number) => number;

const addOp: CalcOperation = (a, b = 0) => a + b;
const subtractOp: CalcOperation = (a, b = 0) => a - b;
const multiplyOp: CalcOperation = (a, b = 1) => a * b;
const divideOp: CalcOperation = (a, b = 1) => (b !== 0 ? a / b : NaN);
const powerOp: CalcOperation = (a, b = 2) => Math.pow(a, b);
const sqrtOp: CalcOperation = (a) => Math.sqrt(a);

const operationMap: Record<string, CalcOperation> = {
    add: addOp,
    subtract: subtractOp,
    multiply: multiplyOp,
    divide: divideOp,
    power: powerOp,
    sqrt: sqrtOp,
};

let inputBuffer = "";
let storedValue = 0;
let pendingOperation: CalcOperation | null = null;
let pendingSymbol = "";

function renderInput(value: string) {
    const input = document.getElementById("display") as HTMLInputElement;
    input.value = value;
}

function renderOperation(text: string) {
    const operationInfo = document.getElementById("operation-display");
    if (operationInfo) {
        operationInfo.textContent = text;
    }
}

function onNumberClick(value: string) {
    inputBuffer += value;
    renderInput(inputBuffer);
}

function onOperationClick(action: string) {
    if (action === "subtract" && inputBuffer === "") {
        inputBuffer = "-";
        renderInput(inputBuffer);
        return;
    }

    if (action === "sqrt") {
        storedValue = parseFloat(inputBuffer) || 0;
        const result = sqrtOp(storedValue);
        inputBuffer = result.toString();
        renderInput(inputBuffer);
        renderOperation(`√${storedValue}`);
        return;
    }

    if (pendingOperation) executeCalculation();

    if (action in operationMap) {
        pendingOperation = operationMap[action];
        pendingSymbol = resolveSymbol(action);
        storedValue = parseFloat(inputBuffer) || 0;
        inputBuffer = "";
        renderOperation(`${storedValue} ${pendingSymbol}`);
    }
}

function resolveSymbol(action: string) {
    switch (action) {
        case "add": return "+";
        case "subtract": return "-";
        case "multiply": return "×";
        case "divide": return "÷";
        case "power": return "^";
        default: return "";
    }
}

function executeCalculation() {
    if (pendingOperation) {
        const nextValue = parseFloat(inputBuffer) || 0;
        const result = pendingOperation(storedValue, nextValue);
        inputBuffer = result.toString();
        renderInput(inputBuffer);
        renderOperation(`${storedValue} ${pendingSymbol} ${nextValue} =`);
        pendingOperation = null;
    }
}

function resetCalculator() {
    inputBuffer = "";
    storedValue = 0;
    pendingOperation = null;
    renderInput(inputBuffer);
    renderOperation("");
}

function eraseLastChar() {
    inputBuffer = inputBuffer.slice(0, -1);
    renderInput(inputBuffer || "0");
}

document.addEventListener("DOMContentLoaded", () => {
    const keys = document.querySelectorAll(".btn");
    keys.forEach((key) => {
        key.addEventListener("click", (event) => {
            const element = event.target as HTMLButtonElement;
            const value = element.getAttribute("data-value");
            const action = element.getAttribute("data-action");

            if (value) {
                onNumberClick(value);
            } else if (action) {
                switch (action) {
                    case "clear":
                        resetCalculator();
                        break;
                    case "calculate":
                        executeCalculation();
                        break;
                    case "backspace":
                        eraseLastChar();
                        break;
                    default:
                        onOperationClick(action);
                        break;
                }
            }
        });
    });
});
