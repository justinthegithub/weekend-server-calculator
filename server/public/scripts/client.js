console.log('client.js is sourced!');


function  calculateNumbers(a,b) {
    console.log("calculateNumbers() is working!")
    console.log("Succesfully passing in the first number", a, "And the second number:", b)

}

function add(a,b) {
return a+b
}
function subtract(a,b){
return a-b
}

function multiply(a,b){
return a*b;
}

function divide(a,b){
return a/b

}



    function equalsClick(event) {
        event.preventDefault(); 
    
        
        const numberOne = document.getElementById('numberOne').value;
        const numberTwo = document.getElementById('numberTwo').value;
        console.log('First Number:', numberOne);
        console.log('Second Number:', numberTwo);

        calculateNumbers(numberOne, numberTwo)

    
    
    }


    





