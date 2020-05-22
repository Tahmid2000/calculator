function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

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

var container = document.getElementById('container');
var container2 = document.getElementById('main-grid');
var container3 = document.getElementById('right-grid');
var screen = document.getElementById('input-tab');

function createMainGrid() {
    var firstRow = ['AC', '+/-', "√", "^", 7, 8, 9, "÷", 4, 5, 6, "x", 1, 2, 3, "-", 0, ".", "=", "+"];
    firstRow.forEach(element => {
        let newDiv = document.createElement("button");
        newDiv.className = "num-item";
        newDiv.id = element;
        newDiv.innerHTML = element;
        container2.appendChild(newDiv);
    });
}

function generate() {
    const buttons = document.querySelectorAll('.num-item');
    var count = 0;
    var nums = [];
    var ops = [];
    var all = [];
    var signcount = 0;
    screen.innerHTML = '0'
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            container2.style.marginBottom = "0px";
            if (button.id == 'AC') {
                screen.innerHTML = "0";
                count = 0;
                nums = [];
                ops = [];
                all = [];
                signcount = 0;
            } else if (button.id == '+/-') {
                signcount++;
                if (signcount % 2 == 1)
                    screen.innerHTML = '-' + screen.innerHTML;
                else
                    screen.innerHTML = screen.innerHTML.substring(1, screen.innerHTML.length);
                count++;

            } else if (button.id == '=') {
                var temp = "";
                for (let i = 0; i < all.length; i++) {
                    temp += all[i];
                }
                nums.push(parseInt(temp));
                screen.innerHTML = operate(nums, ops[0]);
                count = 0;
                nums = [];
                ops = [];
                all = [];

            } else if (count < 14) {

                if (!(button.id >= 0 && button.id <= 9)) {
                    nums.push(parseInt(screen.innerHTML));
                    ops.push(button.id);
                    all = [];
                }
                if (screen.innerHTML == '0') {
                    screen.innerHTML = "";
                }
                screen.innerHTML += button.id;
                if (button.id >= 0 && button.id <= 9)
                    all.push(button.id);
                count++;
            }
        });
    });
}

createMainGrid();
generate();