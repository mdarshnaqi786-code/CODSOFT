let expression = "";
let sciExpression = "";
let historyArr = [];

// ---------------- SECTION SWITCH ----------------
function showSection(id) {
    document.querySelectorAll(".section").forEach(sec => {
        sec.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

// ---------------- DROPDOWN ----------------
const dropdownBtn = document.querySelector(".dropdown-btn");
const dropdownContent = document.querySelector(".dropdown-content");

dropdownBtn.addEventListener("click", () => {
    dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
});

// ---------------- THEME TOGGLE ----------------
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeToggle.innerText = document.body.classList.contains("dark")
        ? "☀ Light Mode"
        : "🌙 Dark Mode";
});

// ---------------- BASIC CALCULATOR ----------------
function appendValue(value) {
    const display = document.getElementById("display");

    try {
        if (value === "AC") {
            expression = "";
        } 
        else if (value === "⌫") {
            expression = expression.slice(0, -1);
        } 
        else if (value === "%") {
            expression = expression ? (eval(expression) / 100).toString() : "";
        } 
        else if (value === "=") {
            let result = eval(expression);
            addHistory(`${expression} = ${result}`);
            expression = result.toString();
        } 
        else {
            expression += value;
        }
    } catch {
        expression = "Error";
    }

    display.value = expression;
}

// ---------------- SCIENTIFIC CALCULATOR ----------------
function sciAppend(value) {
    sciExpression += value;
    document.getElementById("sci-display").value = sciExpression;
}

function sciClear() {
    sciExpression = "";
    document.getElementById("sci-display").value = "";
}

function sciFunc(func) {
    try {
        let val = eval(sciExpression.replaceAll("π", Math.PI));

        if (func === "sin") sciExpression = Math.sin(val).toString();
        if (func === "cos") sciExpression = Math.cos(val).toString();
        if (func === "tan") sciExpression = Math.tan(val).toString();
        if (func === "log") sciExpression = Math.log10(val).toString();
        if (func === "ln") sciExpression = Math.log(val).toString();

    } catch {
        sciExpression = "Error";
    }

    document.getElementById("sci-display").value = sciExpression;
}

function sciEqual() {
    try {
        let exp = sciExpression
            .replaceAll("π", Math.PI)
            .replaceAll("^", "**");

        let result = eval(exp);
        addHistory(`${sciExpression} = ${result}`);
        sciExpression = result.toString();

    } catch {
        sciExpression = "Error";
    }

    document.getElementById("sci-display").value = sciExpression;
}

// ---------------- HISTORY ----------------
function addHistory(item) {
    historyArr.unshift(item);

    const list = document.getElementById("history-list");
    list.innerHTML = "";

    historyArr.forEach(entry => {
        let li = document.createElement("li");
        li.innerText = entry;
        list.appendChild(li);
    });
}

// ---------------- UNIT CONVERTER ----------------
const unitData = {
    currency: ["INR", "USD", "EUR"],
    length: ["Meter", "Kilometer", "Centimeter"],
    area: ["Sq Meter", "Sq Kilometer"],
    volume: ["Liter", "Milliliter"],
    weight: ["Kg", "Gram", "Pound"],
    temperature: ["Celsius", "Fahrenheit"],
    speed: ["Km/h", "m/s"],
    pressure: ["Pascal", "Bar"],
    power: ["Watt", "Kilowatt"],
    number: ["Decimal", "Binary", "Hexadecimal"]
};

function setConverter(type) {
    showSection("converter");

    document.getElementById("converter-title").innerText =
        type.charAt(0).toUpperCase() + type.slice(1) + " Converter";

    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");

    from.innerHTML = "";
    to.innerHTML = "";

    unitData[type].forEach(unit => {
        from.innerHTML += `<option>${unit}</option>`;
        to.innerHTML += `<option>${unit}</option>`;
    });

    from.dataset.type = type;
}

function convertUnit() {
    let value = parseFloat(document.getElementById("inputValue").value);

    if (isNaN(value)) {
        document.getElementById("result").innerText = "Enter valid value";
        return;
    }

    let from = document.getElementById("fromUnit").value;
    let to = document.getElementById("toUnit").value;
    let type = document.getElementById("fromUnit").dataset.type;
    let result = value;

    if (from === to) {
        result = value;
    }

    // LENGTH
    else if (type === "length") {
        const units = {
            "Meter": 1,
            "Kilometer": 1000,
            "Centimeter": 0.01
        };
        result = value * units[from] / units[to];
    }

    // AREA
    else if (type === "area") {
        const units = {
            "Sq Meter": 1,
            "Sq Kilometer": 1000000
        };
        result = value * units[from] / units[to];
    }

    // VOLUME
    else if (type === "volume") {
        const units = {
            "Liter": 1,
            "Milliliter": 0.001
        };
        result = value * units[from] / units[to];
    }

    // WEIGHT
    else if (type === "weight") {
        const units = {
            "Kg": 1,
            "Gram": 0.001,
            "Pound": 0.453592
        };
        result = value * units[from] / units[to];
    }

    // TEMPERATURE
    else if (type === "temperature") {
        if (from === "Celsius" && to === "Fahrenheit")
            result = (value * 9/5) + 32;
        else if (from === "Fahrenheit" && to === "Celsius")
            result = (value - 32) * 5/9;
    }

    // SPEED
    else if (type === "speed") {
        const units = {
            "Km/h": 0.277778,
            "m/s": 1
        };
        result = value * units[from] / units[to];
    }

    // PRESSURE
    else if (type === "pressure") {
        const units = {
            "Pascal": 1,
            "Bar": 100000
        };
        result = value * units[from] / units[to];
    }

    // POWER
    else if (type === "power") {
        const units = {
            "Watt": 1,
            "Kilowatt": 1000
        };
        result = value * units[from] / units[to];
    }

    // NUMBER SYSTEM
    else if (type === "number") {
        if (from === "Decimal" && to === "Binary")
            result = parseInt(value).toString(2);
        else if (from === "Decimal" && to === "Hexadecimal")
            result = parseInt(value).toString(16).toUpperCase();
        else if (from === "Binary" && to === "Decimal")
            result = parseInt(value, 2);
        else if (from === "Hexadecimal" && to === "Decimal")
            result = parseInt(value, 16);
    }

    // CURRENCY (dummy values)
    else if (type === "currency") {
        const rates = {
            "INR": 1,
            "USD": 83,
            "EUR": 90
        };
        result = value * rates[from] / rates[to];
    }

    document.getElementById("result").innerText = result;
    addHistory(`${value} ${from} = ${result} ${to}`);
}

// Default
showSection("basic");