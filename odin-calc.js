const buttons = document.querySelectorAll('button')
const display = document.querySelector('.display')

let result = '';
let displayData = "";
let currentNum = '';
let operator = '';
let previousNum = '';

// add function
function addNum(a, b){
    let firstNum = Number(a);
    let SecondNum = Number(b);
    return firstNum + SecondNum;
}

// subtraction function
function subtractNum(a, b){
    let firstNum = Number(a);
    let SecondNum = Number(b);
    return firstNum - SecondNum;
}

// multiply function
function multiplyNum(a, b){
    let firstNum = Number(a);
    let SecondNum = Number(b);
    return firstNum * SecondNum;
}

// divide function
function divideNum(a, b){
    let firstNum = Number(a);
    let SecondNum = Number(b);
    return firstNum / SecondNum;
}

// round number 
function roundNumber(num){
    return Math.round(num * 100)/ 100;
}

// clear screen
function clearScreen(){
    currentNum = '';
    previousNum = '';
    displayData = '';
    operator = '';
    display.textContent = '0'
}

// update the screen before operator
function b4opScreen(a){
    currentNum += a;
    displayData += a;
    display.textContent = displayData;
}

// update the screen after operator
function afterOpScreen(a){
    operator = a;
    previousNum = currentNum ;
    displayData = previousNum + operator;
    display.textContent = displayData;
    currentNum = '';
    
}

// equal button display function
function equalButtonDisplay(a){
    displayData = a
    display.textContent = displayData
    previousNum = a;
    operator = '';
    currentNum = '';

}

// button function 
function activateButton(){
    display.textContent = '0'
    buttons.forEach(button => {
        button.addEventListener('click', () => { 
            const valueArray = {
                numArray: [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                operator: ["/", "*", "-", "+", "%",]
            }
            // input numbers
            if(valueArray.numArray.includes(button.value) && currentNum.length < 5) {
                b4opScreen(button.value)
            }
           // add an operator in front of previous value and clear current value
            if(valueArray.operator.includes(button.value) && currentNum !== ''){
                afterOpScreen(button.value);
            }
            // calculate first pair
            if(button.value == "=" && currentNum !== "" && previousNum !== "" && operator !== ""){
                if(operator == "/"){
                    equalButtonDisplay(roundNumber(divideNum(previousNum, currentNum)));
                }
                else if(operator == "*"){
                    
                    equalButtonDisplay(roundNumber(multiplyNum(previousNum, currentNum)));
                }
                else if(operator == "-"){
                    equalButtonDisplay(roundNumber(subtractNum(previousNum, currentNum)));
                }
                else if(operator == "+"){
                    equalButtonDisplay(roundNumber(addNum(previousNum, currentNum)));
                }
            }
            // calculate using result of the first pair
            if(valueArray.operator.includes(button.value) && previousNum !== "" && currentNum == "" ){
                operator = button.value;
                displayData = previousNum + operator;
                display.textContent = displayData;
            }
            if(valueArray.operator.includes(button.value) && previousNum !== "" && currentNum == "" && operator !== ""){
                operator = button.value;
            }
            if(button.value == "ac"){
                clearScreen();
            }
        })  
            
            
    })
}

activateButton();