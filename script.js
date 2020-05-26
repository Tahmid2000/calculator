var container = document.getElementById("container");
var container2 = document.getElementById("main-grid");
var container3 = document.getElementById("right-grid");
var screen = document.getElementById("input-tab");
var screen2 = document.getElementById("other-tab");
const charList = "+-*/^=.0123456789e";
const ops = "+-*/^";
var result = "";

function createMainGrid() {
  var firstRow = [
    "AC",
    "C",
    "xʸ",
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
  screen.innerHTML = "0";
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      if (result.charAt(0) === "0") result = result.substring(1);
      if (button.id === "AC") allClear(); //all clear
      else if (button.id === "+/-") signs() //pos/negt
      else if (button.id === "C") backspace(); //backspace
      else if (button.id === "=") equal(); //equals
      else {
        //any other key
        if (screen.innerHTML === "0" || screen.innerHTML === "Infinity")
          screen.innerHTML = "";

        if (!(button.id >= 0 && button.id <= 9) && button.id != ".") {
          if (screen.innerHTML != "") {
            if (screen2.innerHTML.indexOf("=") != -1) {
              screen2.innerHTML = "";
            }
            if (button.id === "÷") result += "/";
            else if (button.id === "x") result += "*";
            else if (button.id === "xʸ") result += "**";
            else result += button.id;
            if (button.id === "xʸ")
              screen2.innerHTML += screen.innerHTML + " " + "^" + " ";
            else screen2.innerHTML += screen.innerHTML + " " + button.id + " ";
            screen.innerHTML = "0";
          } else screen.innerHTML = "0";
        } else if (screen.innerHTML.length < 10) {
          result += button.id;
          screen.innerHTML += button.id;
        }
      }
      checkOverflow();
    });
  });
}

function generateKeys() {
  screen.innerHTML = "0";
  document.addEventListener("keydown", (e) => {
    if (result.charAt(0) === "0") result = result.substring(1);
    if (e.key === "a") allClear(); //all clear
    else if (e.key === "Backspace") backspace(); //backspace
    else if (e.key === "=" || e.key === "Enter") equal(); // equals
    else if (charList.indexOf(e.key) != -1) {
      //any other key
      if (screen.innerHTML === "0" || screen.innerHTML === "Infinity")
        screen.innerHTML = "";

      if (ops.indexOf(e.key) !== -1) {
        if (screen.innerHTML != "") {
          if (e.key != "^") result += e.key;
          else result += "**";
          if (screen2.innerHTML.indexOf("=") != -1) {
            screen2.innerHTML = "";
          }
          if (e.key === "*") screen2.innerHTML += screen.innerHTML + " x ";
          else if (e.key === "/") screen2.innerHTML += screen.innerHTML + " ÷ ";
          else screen2.innerHTML += screen.innerHTML + " " + e.key + " ";
          screen.innerHTML = "0";
        } else screen.innerHTML = "0";
      } else if (screen.innerHTML.length < 10) {
        result += e.key;
        screen.innerHTML += e.key;
      }
    }
    checkOverflow();
  });
}

function allClear() {
  screen.innerHTML = "0";
  result = "";
  screen2.innerHTML = "";
}

function backspace() {
  if (
    screen.innerHTML === "Infinity" ||
    (screen.innerHTML == "" && screen2.innerHTML.indexOf("=") == -1)
  ) {
    screen.innerHTML = "0";
    result = screen2.innerHTML;
  } else if (screen.innerHTML != "0") {
    screen.innerHTML = screen.innerHTML.substring(
      0,
      screen.innerHTML.length - 1
    );
    result = result.substring(0, result.length - 1);
    if (screen.innerHTML == "") {
      screen.innerHTML = "0";
      if (screen2.innerHTML.indexOf("=") != -1) {
        result = "";
        screen2.innerHTML = "";
      }
    }
  }
}

function equal() {
  if (screen.innerHTML === "0") result += 0;
  screen2.innerHTML += screen.innerHTML + " = ";
  //checkOverflow();
  var temp = eval(result);
  if (temp > 9999999999 || temp < -9999999999 || (temp > 0 && temp < .000000001)) {
    temp = temp.toExponential(4);
  } else if (("" + temp).length > 10) {
    temp = ("" + temp).substring(0, 10);
  }
  screen.innerHTML = "" + temp;
  result = "" + temp;
}

function signs() {
  if (screen.innerHTML !== "0") {
    if (screen.innerHTML < 0) {
      result = result.substring(
        0,
        result.length - screen.innerHTML.length - 2
      );
      screen.innerHTML *= -1;
      result += " " + screen.innerHTML;
    } else {
      result = result.substring(
        0,
        result.length - screen.innerHTML.length
      );
      screen.innerHTML *= -1;
      result += " (" + screen.innerHTML + ")";
    }
  }
}

function checkOverflow() {
  let totLength = screen2.innerHTML.replace(/\s+/g, '').length;
  if (totLength > 19) {
    if (totLength <= 38) {
      screen2.style.paddingTop = '70px';
      screen.style.marginBottom = '470px';
    } else if (totLength > 38 && totLength < 38 + 19) {
      screen2.style.paddingTop = '50px';
      screen.style.marginBottom = '450px';
    } else if (totLength >= 38 + 19 && totLength < 76) {
      screen2.style.paddingTop = '30px';
      screen.style.marginBottom = '430px';
    } else {
      screen2.style.paddingTop = '90px';
      screen.style.marginBottom = '500px';
      screen2.innerHTML = "";
      result = "";
      screen.innerHTML = "0";
    }
  } else {
    screen2.style.paddingTop = '90px';
    screen.style.marginBottom = '500px';
  }
}

//throw error, colored background, add button highlights for keyboard
createMainGrid();
generateMouse();
generateKeys();