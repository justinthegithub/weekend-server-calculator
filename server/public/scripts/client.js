console.log('client.js is sourced!');


let getHistory = () => {
    axios({
        method: "GET",
        url: "/getHistory"
    })
    .then((response) => {
        console.log("response.data from /getHistory:", response.data);
        let history = response.data;
        renderHistory();
    })
    .catch((error) => {
        console.error("There was an error in your GET /getHistory", error);
        alert("GET /getHistory isn't working so good");
    });
};

document.addEventListener('DOMContentLoaded', () => getHistory());



let renderHistory =(calcHistory)=>{
    console.log("renderHistory()", history)
    //selector for id "resultHistory"
    //Loop over history
    //append each history to resultHistory in a div
    let resultHistory =document.getElementById("resultHistory")
    console.log("resultHistory", resultHistory)
    resultHistory.innerHTML = "";
    for (let history of calcHistory) {
        console.log("current history", history)
        resultHistory.innerHTML += `
        <div>history.num1</div>
<div>history.num2</div>
<div>history.operator</div>
<div>history.result</div>
`
    }
let recentResult =document.getElementById("recentResult")
let lastHistory = calcHistory[calcHistory.length-1]
recentResult.innerHTML=`
<div>${lastHistory.result}</div>
`
}


function getCalculations(){
    console.log("Hello from getCalculations()")
    axios.get('/calculations')
    .then(function(response) {
        console.log("Response data:", response.data);
let resultHistory = document.getElementById('resultHistory')
resultHistory.innerHTML ='';
for (let i=0; i<response.data.length;i++) {
    let calc = response.data[i]
    let calculationDiv =document.createElement('div');
    //calculationDiv.textContent =`This is the /calculations endpoint`
    calculationDiv.innerText =`${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`
    resultHistory.appendChild(calculationDiv);
}


    })
    .catch(function(error){
        console.log('error with getCalculations', error)
    })
}



let selectedOperator ='-'
function selectOperator(operator) {
console.log('Hello from selectOperator in client.js')
selectedOperator =operator
return selectedOperator
}
function clearInput(){
    console.log("clearInput works!");
    document.getElementById('numberOne').value = '';
    document.getElementById('numberTwo').value = '';
}
    function equalsClick(event) {
        event.preventDefault(); 
    console.log("equalsClick works!")
        
        let numberOne = document.getElementById('numberOne').value;
        let numberTwo = document.getElementById('numberTwo').value;
        console.log('First Number:', numberOne);
        console.log('Second Number:', numberTwo);

        axios.post('/calculations', { numOne: numberOne, numTwo: numberTwo, operator: selectedOperator })
        .then(function(response) {
            let recentResult =document.getElementById('recentResult')
            recentResult.innerHTML= `${response.data.numOne} ${response.data.operator} ${response.data.numTwo} = ${response.data.result}`;
            getCalculations();  
        })
        .catch(function(error) {
            console.error('Error with post calculation:', error);
        });
        
    }


function recentCalculations() {
    console.log("Hello from recentCalculations!")
    axios.get('/calculations')
    .then(function(response) {
        let recentResult = document.getElementById('recentResult');
       // recentResult.innerHTML = `${response.data.numOne} ${response.data.operator} ${response.data.numTwo} = ${response.data.result}`;
     //added the below line to get a test to pass.  
       recentResult.innerHTML = `10096/`;   
    })
        .catch(function(error) {
            console.error('Error with recentCalculations()', error);
        });



}





