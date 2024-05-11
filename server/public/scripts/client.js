console.log('client.js is sourced!');
document.addEventListener('DOMContentLoaded',getCalculations)


function getCalculations(){
    axios.get('/calculations')
    .then(function(response) {
let resultHistory = document.getElementById('resultHistory')
resultHistory.innerHTML ='';
for (let i=0; i<response.data.length;i++) {
    let calc = response.data[i]
    let calculationDiv =document.createElement('div');
    calculationDiv.textContent =`${calc.numOne} ${calc.operator} ${calc.numTwo}`
    resultHistory.appendChild(calculationDiv);
}


    })
    .catch(function(error){
        console.log('error with getCalculations', error)
    })
}



let selectedOperator =''
function selectOperator(operator) {
selectedOperator =operator
return selectedOperator
}


    function equalsClick(event) {
        event.preventDefault(); 
    
        
        let numberOne = document.getElementById('numberOne').value;
        let numberTwo = document.getElementById('numberTwo').value;
        console.log('First Number:', numberOne);
        console.log('Second Number:', numberTwo);
        axios.post('/calculations', { numOne: numberOne, numTwo: numberTwo, operator: selectedOperator })
        .then(function(response) {
            let recentResult =document.getElementById('numberOne').value;
            recentResult.innerHTML= `${response.data.numOne} ${response.data.operator} ${response.data.numTwo} = ${response.data.result}`;
            getCalculations();  
        })
        .catch(function(error) {
            console.error('Error with post calculation:', error);
        });
        
    }







    





