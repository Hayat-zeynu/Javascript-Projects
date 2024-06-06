const displayElement = document.querySelector('.value');


function hitsNumberKey(input) {
    const currentDisplay = displayElement.textContent;
    if (currentDisplay =='0') {
   displayElement.textContent = input;
    } else {
        displayElement.textContent += input;
    }
    

}
function hitsOperatorKey(operator) {
    const currentDisplay = displayElement.textContent;
    if (currentDisplay != operator) {
        displayElement.textContent += operator;
    } else {
        return;
    }

}

function calculate() {
    try {
        displayElement.textContent = eval(displayElement.textContent)
    }
    catch (error) {
        displayElement.textContent='error'
    }
}
function hitsAcKey() {
    displayElement.textContent = '0';
}
function handleDecimal() {
if (displayElement.textContent == '0') {
  displayElement.textContent = "0.";
} else {
    displayElement.textContent += '.';
}

}
