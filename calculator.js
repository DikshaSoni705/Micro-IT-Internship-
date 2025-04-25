const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = "";
let previousInput = "";

function updateScreen(value) {
    screen.textContent = value;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (button.classList.contains("num")) {
            currentInput += value;
            updateScreen(currentInput);
        } else if (button.classList.contains("operator")) {
            if (value === "=") {
                calculate();
            } else {
                if (currentInput === "") return;
                operator = value;
                previousInput = currentInput;
                currentInput = "";
            }
        } else if (button.classList.contains("reset")) {
            currentInput = "";
            previousInput = "";
            operator = "";
            updateScreen("0");
        } else if (button.classList.contains("negative")) {
            currentInput = (parseFloat(currentInput) * -1).toString();
            updateScreen(currentInput);
        } else if (button.classList.contains("percent")) {
            currentInput = (parseFloat(currentInput) / 100).toString();
            updateScreen(currentInput);
        }
    });
});

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "-":
            result = prev - curr;
            break;
        case "X":
            result = prev * curr;
            break;
        case "÷":
        case "&#247;":
            result = prev / curr;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateScreen(currentInput);
}

// Default screen value
updateScreen("0");
