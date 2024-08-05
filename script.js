let operator ="";
let firstNumber = "";
let secondNumber = "";

let display = "";
let arrayofOperation = []
const operands = ["+","-","x","/"]
let input = document.querySelector(".display")
let floatPoint = document.querySelector(".floatingPoint")




function setDisplay(character){
    if(character.textContent == "C") {
        display = ""
        arrayofOperation = []
        input.value = "";
        floatPoint.disabled = false
    } else {
        if(operands.includes(character.textContent) || operands.includes(arrayofOperation[arrayofOperation.length-1])){
            if(typeof character == "number"){
                display += Number.isInteger(character) ? character.toString() : character.toFixed(2).toString();
                arrayofOperation.push(character.toString())
                input.value = display;
            } else  {
                console.log(display)
                display += character.textContent;
                arrayofOperation.push(character.textContent)
                input.value = display;
            }
        } else {
            if(typeof character == "number" ){
                display += Number.isInteger(character) ? character.toString() : character.toFixed(2).toString();
                arrayofOperation = []
                arrayofOperation.push(character.toString())
                input.value = display;
            } else  {
                display += character.textContent;
                arrayofOperation.push(character.textContent)
                input.value = display;
            }
        }
        
    }
    input.setAttribute("value", display);
}

function add(firstNumber,secondNumber){
    return Number(firstNumber)+Number(secondNumber)
}

function subtract(firstNumber,secondNumber){
    return Number(firstNumber)-Number(secondNumber)
}

function multiply(firstNumber,secondNumber){
    return Number(firstNumber)*Number(secondNumber)
}

function divide(firstNumber,secondNumber){
    return Number(firstNumber)/Number(secondNumber)
}

function operate(operator,firstNumber,secondNumber){
    if(operator == "+") {
        display = ""
        setDisplay(add(firstNumber,secondNumber))
    }
    if(operator == "-") {
        display = ""
        setDisplay(subtract(firstNumber,secondNumber))
    }
    if(operator == "x") {
        display = ""
        setDisplay(multiply(firstNumber,secondNumber))
    }
    if(operator == "/") {
        if(secondNumber == "0"){
            display = "you cant devide by zero"
            arrayofOperation = []
            input.setAttribute("value", display);
        } else {
            display = ""
            setDisplay(divide(firstNumber,secondNumber))
        }
    }
}

let buttons = document.querySelectorAll("button")

function checkCharacter(){
            let breakingIndex;
            for (let index = 0; index < arrayofOperation.length; index++) {
                if(!isNaN(arrayofOperation[index]) || arrayofOperation[index] == "."){
                    firstNumber += arrayofOperation[index]
                } else {
                    operator += arrayofOperation[index];
                    breakingIndex = index
                    break;
                }
                
            }
            secondNumber = arrayofOperation.slice(breakingIndex+1).join("")
            operate(operator,firstNumber,secondNumber)
            firstNumber = "";
            secondNumber = "";
            operator = "";
}

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (display == "you cant devide by zero") display=""
        if(e.target.textContent == "="){
            checkCharacter()
        } else if(operands.includes(e.target.textContent) && arrayofOperation.length >= 3){
            checkCharacter()
            arrayofOperation.push(e.target.textContent)
            display += e.target.textContent
            input.value = display;
            
        }
        else {
            setDisplay(e.target)
        }
        // floatPoint logic disable start
        let list = display.split('');
        let activeOperand = false;
        list.forEach((element) => { if(operands.includes(element)) activeOperand = true} )
        if(e.target.className == 'floatingPoint' || activeOperand) {
            console.log(display)
            console.log(list)
            let floatsNumber = list.reduce((total,element)=>{
                if(element == '.') {
                    total++;
                    console.log(total)
                    return total;
                } else {
                    return total;
                }
            },0)
            console.log(floatsNumber)
            let correctOperator;
            operands.forEach(operand => {
                if (list.includes(operand)) correctOperator = operand
            }
            )
            console.log(correctOperator)
            if(correctOperator){
                console.log("i should not run")
                console.log(button)
                if(floatsNumber >= 2) floatPoint.disabled = true
                else floatPoint.disabled = false
            } else {
                console.log("i should run")
                console.log(button)
                if(floatsNumber >= 1) floatPoint.disabled = true
                else floatPoint.disabled = false
            }
        // floatpoint logic disabl end
}})})


// keyboard support
input.addEventListener('input',(e) => {
    const symbols = ['+','x','/','-','=']
    console.log(input.value)
    if(e.inputType === 'deleteContentBackward'){
        let templist = input.value.split('')
        input.value = templist.join('')
        display = input.value
    } else {
        arrayofOperation = input.value.split('')
    }
    arrayofOperation = input.value.split('')
    let lastItem = arrayofOperation[arrayofOperation.length - 1]
    if(symbols.includes(lastItem) && arrayofOperation.length > 3){
        arrayofOperation.pop()
        checkCharacter()
    } 
    if ((((lastItem != '=' && (!isNaN(lastItem) || symbols.includes(lastItem))) || lastItem == ".") && e.inputType != 'deleteContentBackward') ){
        arrayofOperation.push(lastItem)
        display += lastItem
    } 
    input.value = display    
    // floatPoint logic disable start
    let list = display.split('');
    let activeOperand = false;
    console.log(list)
    list.forEach((element) => { if(operands.includes(element)) activeOperand = true} )
    if(list.includes('.') || activeOperand) {
        console.log(display)
        console.log(list)
        let floatsNumber = list.reduce((total,element)=>{
            if(element == '.') {
                total++;
                console.log(total)
                return total;
            } else {
                return total;
            }
        },0)
        console.log(floatsNumber)
        let correctOperator;
        operands.forEach(operand => {
            if (list.includes(operand)) correctOperator = operand
        }
        )
        console.log(correctOperator)
        if(correctOperator){
            if(floatsNumber >= 2) {
                floatPoint.disabled = true 
            }
            else floatPoint.disabled = false
        } else {
            if(floatsNumber >= 1) {
                floatPoint.disabled = true
            }
            else floatPoint.disabled = false
        }
    } else {
        floatPoint.disabled = false
    }
    if(input.value == "") floatPoint.disabled = false
    // floatpoint logic disabl end
    // the logic you did is blocking
})


