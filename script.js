var container = document.getElementById("container");
var container2 = document.getElementById("main-grid");
var container3 = document.getElementById("right-grid");
var screen = document.getElementById("input-tab");

function createMainGrid() {
  var firstRow = [
    "AC",
    "xʸ",
    "C",
    "÷",
    7,
    8,
    9,
    "x",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "+/-",
    "="
  ];
  firstRow.forEach(element => {
    if (element === "AC" || element === "xʸ" || element === "C") {
      let newDiv = document.createElement("button");
      newDiv.className = "clear-item";
      newDiv.id = element;
      newDiv.innerHTML = element;
      container2.appendChild(newDiv);
    } else if (
      element === "÷" ||
      element === "x" ||
      element === "+" ||
      element === "-" ||
      element === "="
    ) {
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
  const buttons = document.querySelectorAll(".num-item, .clear-item, .op-item");
  var count = 0;
  var result = "0";
  var signcount = 0;
  screen.innerHTML = "0";
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (button.id === "AC") {
        screen.innerHTML = "0";
        count = 0;
        result = "0";
        signcount = 0;
      } else if (button.id === "+/-") {
        signcount++;
        if (signcount % 2 == 1) {
          screen.innerHTML = "-" + screen.innerHTML;
          result = "-" + result;
          count++;
        } else {
          screen.innerHTML = screen.innerHTML.substring(
            1,
            screen.innerHTML.length
          );
          result = result.substring(1, result.length);
          count--;
        }
      } else if (button.id === "C") {
        if (count != 0) count--;
        if (screen.innerHTML != "0") {
          screen.innerHTML = screen.innerHTML.substring(
            0,
            screen.innerHTML.length - 1
          );
          result = result.substring(0, result.length - 1);
        }
        if (count == 0) {
          screen.innerHTML = "0";
          result = "0";
        }
      } else if (button.id === "=") {
        var temp = eval(result);
        screen.innerHTML = temp;
        result = "";
        count = screen.innerHTML.length;
      } else if (count < 11) {
        if (screen.innerHTML === "0") {
          screen.innerHTML = "";
          result = "";
        }

        if (!(button.id >= 0 && button.id <= 9)) {
          if (button.id === "÷") result += "/";
          else if (button.id === "x") result += "*";
          else result += button.id;
        } else if (button.id >= 0 && button.id <= 9) result += button.id;
        screen.innerHTML += button.id;
        count++;
      }
    });
  });
}

function generateKeys() {
  //const buttons = document.querySelectorAll(".num-item, .clear-item, .op-item");
  document.addEventListener("keydown", e => {
    if (e.key >= 0 && e.key <= 9) console.log(e.key);
  });
}
//exponential function, second input(for result and after operator number), add keyboard, functions, colored background, fix decimal(input and output)
createMainGrid();
generateMouse();
generateKeys();
