function sum(arr) {
    const sum = arr.reduce((total, ar) => {
        return total + ar;
    }, 0);
    return sum;
}

function subtractall(arr) {
    const sum = arr.reduce((total, ar) => {
        return total - ar;
    }, arr[0] + arr[0]);
    return sum;
}

function multiply(arr) {
    const sum = arr.reduce((total, ar) => {
        return total * ar;
    }, arr[0]);
    return sum / arr[0];
}

function divide(arr) {
    const sum = arr.reduce((total, ar) => {
        return total / ar;
    }, arr[0]);
    return sum * arr[0];
}

function power(a, b) {
    return Math.pow(a, b);
}

function operate(nums, op) {
    if (op === "+") {
        return sum(nums)
    }
    if (op === "-") {
        return subtractall(nums)
    }
    if (op === "÷") {
        return divide(nums)
    }
    if (op === "x") {
        return multiply(nums)
    }
    if (op === "^") {
        return power(nums)
    }
    return 'Incorrect operator.';
}

function pemdas() {

}

var container = document.getElementById('container');
var container2 = document.getElementById('main-grid');
var container3 = document.getElementById('right-grid');
var screen = document.getElementById('input-tab');

function createMainGrid() {
    var firstRow = ['AC', "xʸ", "C", "÷", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", '+/-', "="];
    firstRow.forEach(element => {
        if (element === 'AC' || element === 'xʸ' || element === 'C') {
            let newDiv = document.createElement("button");
            newDiv.className = "clear-item";
            newDiv.id = element;
            newDiv.innerHTML = element;
            container2.appendChild(newDiv);
        } else if (element === '÷' || element === 'x' || element === '+' || element === '-' || element === '=') {
            let newDiv = document.createElement("button");
            newDiv.className = "op-item";
            newDiv.id = element;
            newDiv.innerHTML = element;
            container2.appendChild(newDiv);
        } else {
            let newDiv = document.createElement("button");
            newDiv.className = "num-item";
            newDiv.id = element;
            newDiv.innerHTML = element;
            container2.appendChild(newDiv);
        }
    });
}

function generateMouse() {
    const buttons = document.querySelectorAll('.num-item, .clear-item, .op-item');
    var count = 0;
    var result = '0';
    var signcount = 0;
    screen.innerHTML = '0';
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === 'AC') {
                screen.innerHTML = "0";
                count = 0;
                result = "0";
                signcount = 0;
            } else if (button.id === '+/-') {
                signcount++;
                if (signcount % 2 == 1) {
                    screen.innerHTML = '-' + screen.innerHTML;
                    result = '-' + result;
                    count++;
                } else {
                    screen.innerHTML = screen.innerHTML.substring(1, screen.innerHTML.length);
                    result = result.substring(1, result.length);
                    count--;
                }
            } else if (button.id === 'C') {
                if (count != 0)
                    count--;
                if (screen.innerHTML != '0') {
                    screen.innerHTML = screen.innerHTML.substring(0, screen.innerHTML.length - 1);
                    result = result.substring(0, result.length - 1);
                }
                if (count == 0) {
                    screen.innerHTML = "0";
                    result = "0";
                }

            } else if (button.id === '=') {
                var temp = eval(result);
                screen.innerHTML = temp;
                result = '';
                count = screen.innerHTML.length;
            } else if (count < 14) {
                if (screen.innerHTML === '0') {
                    screen.innerHTML = "";
                }

                if (!(button.id >= 0 && button.id <= 9)) {
                    if (button.id === '÷')
                        result += "/";
                    else if (button.id === 'x')
                        result += '*';
                    else
                        result += button.id;
                } else if (button.id >= 0 && button.id <= 9)
                    result += button.id;
                screen.innerHTML += button.id;
                count++;
            }
        });
    });
}
//different color buttons, exponential function, second input(for result and after operator number), add keyboard, functions, make like apple, colored background
createMainGrid();
generateMouse();