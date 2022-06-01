function Add(firstOperand, secondOperand) { return firstOperand + secondOperand };

function Deduct(firstOperand, secondOperand) { return firstOperand - secondOperand };

function Multiply(firstOperand, secondOperand) { return firstOperand * secondOperand };

function Divide(firstOperand, secondOperand) { return firstOperand / secondOperand };

function mathOperation(arg1, arg2, operation) {console.log(operation(arg1, arg2));};

let decideValue = parseInt(Math.random().toString().charAt(7));

let arg1 = parseInt(Math.random().toString().charAt(7));

let arg2 = parseInt(Math.random().toString().charAt(7));

while (decideValue >= 5 || decideValue == 0)
{
    decideValue = parseInt(Math.random().toString().charAt(7));
}

switch (decideValue)
{
    case 1: console.log("Add: ");
    mathOperation(arg1, arg2, Add); 
    break;
    case 2: console.log("Deduct: ");
    mathOperation(arg1, arg2, Deduct); 
    break;
    case 3: console.log("Multiply: ");
    mathOperation(arg1, arg2, Multiply); 
    break;
    case 4: console.log("Divide: ");
    mathOperation(arg1, arg2, Divide); 
    break;
    
}
