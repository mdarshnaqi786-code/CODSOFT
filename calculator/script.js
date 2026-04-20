let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

let expression = "";

// Loop through all buttons
buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.innerText;

        // All Clear (AC)
        if (value === "AC") {
            expression = "";
            display.value = "";
        }

        // Backspace (⌫)
        else if (value === "⌫") {
            expression = expression.slice(0, -1);
            display.value = expression;
        }

        // Percentage (%)
        else if (value === "%") {
            try {
                expression = (eval(expression) / 100).toString();
                display.value = expression;
            } catch {
                display.value = "Error";
                expression = "";
            }
        }

        // Equal (=)
        else if (value === "=") {
            try {
                let result = eval(expression);
                display.value = result;
                expression = result.toString();
            } catch {
                display.value = "Error";
                expression = "";
            }
        }

        // Numbers, 00, operators, dot
        else {
            expression += value;
            display.value = expression;
        }
    });
});