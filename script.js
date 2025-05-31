const display = document.getElementById("display");
const numberBtns = document.querySelectorAll(".numeric_btn");
const operratorBtns = document.querySelectorAll(".operation_btn");
const equalBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");

let currentInput = "";
let firstOperand = null;
let opeator = null;

numberBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
        currentInput += event.target.innerText;
        console.log(currentInput);
        displayText(currentInput);
    })
});

operratorBtns.forEach(button => {
    button.addEventListener("click", (event) => {
        if(firstOperand===null){
            firstOperand = currentInput;
            currentInput = "";
            displayText(null);
        }
        switch(event.target.value){
            case "+" :
                opeator = "+";
                break;

        }
    })
});

equalBtn.addEventListener("click", () => {
    
        console.log("pressed");
        let sum = parseInt(currentInput) + parseInt(firstOperand);
        displayText(sum);
    
});

function displayText(value) {
    display.value = value;
}