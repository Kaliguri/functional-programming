var addOp = function (a, b) {
    if (b === void 0) { b = 0; }
    return a + b;
};
var subtractOp = function (a, b) {
    if (b === void 0) { b = 0; }
    return a - b;
};
var multiplyOp = function (a, b) {
    if (b === void 0) { b = 1; }
    return a * b;
};
var divideOp = function (a, b) {
    if (b === void 0) { b = 1; }
    return (b !== 0 ? a / b : NaN);
};
var powerOp = function (a, b) {
    if (b === void 0) { b = 2; }
    return Math.pow(a, b);
};
var sqrtOp = function (a) { return Math.sqrt(a); };
var operationMap = {
    add: addOp,
    subtract: subtractOp,
    multiply: multiplyOp,
    divide: divideOp,
    power: powerOp,
    sqrt: sqrtOp,
};
var inputBuffer = "";
var storedValue = 0;
var pendingOperation = null;
var pendingSymbol = "";
function renderInput(value) {
    var input = document.getElementById("display");
    input.value = value;
}
function renderOperation(text) {
    var operationInfo = document.getElementById("operation-display");
    if (operationInfo) {
        operationInfo.textContent = text;
    }
}
function onNumberClick(value) {
    inputBuffer += value;
    renderInput(inputBuffer);
}
function onOperationClick(action) {
    if (action === "subtract" && inputBuffer === "") {
        inputBuffer = "-";
        renderInput(inputBuffer);
        return;
    }
    if (action === "sqrt") {
        storedValue = parseFloat(inputBuffer) || 0;
        var result = sqrtOp(storedValue);
        inputBuffer = result.toString();
        renderInput(inputBuffer);
        renderOperation("\u221A".concat(storedValue));
        return;
    }
    if (pendingOperation)
        executeCalculation();
    if (action in operationMap) {
        pendingOperation = operationMap[action];
        pendingSymbol = resolveSymbol(action);
        storedValue = parseFloat(inputBuffer) || 0;
        inputBuffer = "";
        renderOperation("".concat(storedValue, " ").concat(pendingSymbol));
    }
}
function resolveSymbol(action) {
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
        var nextValue = parseFloat(inputBuffer) || 0;
        var result = pendingOperation(storedValue, nextValue);
        inputBuffer = result.toString();
        renderInput(inputBuffer);
        renderOperation("".concat(storedValue, " ").concat(pendingSymbol, " ").concat(nextValue, " ="));
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
document.addEventListener("DOMContentLoaded", function () {
    var keys = document.querySelectorAll(".btn");
    keys.forEach(function (key) {
        key.addEventListener("click", function (event) {
            var element = event.target;
            var value = element.getAttribute("data-value");
            var action = element.getAttribute("data-action");
            if (value) {
                onNumberClick(value);
            }
            else if (action) {
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
