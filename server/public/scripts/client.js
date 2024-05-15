console.log('client.js is sourced!');

=
let getHistory = () => {
    axios({
        method: "GET",
        url: "/calculations"
    })
    .then((response) => {
        console.log("response.data from getHistory:", response.data);
        renderHistory(response.data);
    })
    .catch((error) => {
        console.error("There was an error in your GET getHistory", error);
        alert("GET /getHistory isn't working so good");
    });
};


document.addEventListener('DOMContentLoaded', () => getHistory());

let renderHistory = (calcHistory) => {
    console.log("renderHistory()", calcHistory);
    let resultHistory = document.getElementById("resultHistory");
    resultHistory.innerHTML = ""; 
    for (let i = 0; i < calcHistory.length; i++) {
        console.log("current history", calcHistory[i]);
        
        let calc = calcHistory[i];
        resultHistory.innerHTML += `
        <div>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</div>
        `;
    }

    
    if (calcHistory.length > 0) {
        let recentResult = document.getElementById("recentResult");
        let lastHistory = calcHistory[calcHistory.length - 1];
        recentResult.innerHTML = `<div>${lastHistory.result}</div>`;
    }
};


function getCalculations() {
    console.log("Hello from getCalculations()");
    axios.get('/calculations')
    .then(function(response) {
        console.log("Response data:", response.data);
        let resultHistory = document.getElementById('resultHistory');
        resultHistory.innerHTML = ''; 
        for (let i = 0; i < response.data.length; i++) {
            let calc = response.data[i];
            let calculationDiv = document.createElement('div');
            calculationDiv.innerText = `${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}`;
            resultHistory.appendChild(calculationDiv);
        }
    })
    .catch(function(error) {
        console.log('Error with getCalculations', error);
    });
}

let selectedOperator = '-';
function selectOperator(operator) {
    console.log('Selected Operator in client.js:', operator);
    selectedOperator = operator;
    return selectedOperator;
}

function clearInput() {
    console.log("clearInput works!");
    document.getElementById('numberOne').value = '';
    document.getElementById('numberTwo').value = '';
}

function equalsClick(event) {
    event.preventDefault(); 
    console.log("equalsClick works!");
        
    let numberOne = document.getElementById('numberOne').value;
    let numberTwo = document.getElementById('numberTwo').value;
    console.log('First Number:', numberOne);
    console.log('Second Number:', numberTwo);

    axios.post('/calculations', { numOne: numberOne, numTwo: numberTwo, operator: selectedOperator })
    .then(function(response) {
        let recentResult = document.getElementById('recentResult');
        recentResult.innerHTML = `${response.data.numOne} ${response.data.operator} ${response.data.numTwo} = ${response.data.result}`;
        getCalculations();  
    })
    .catch(function(error) {
        console.error('Error with POST calculation:', error);
    });
}

function recentCalculations() {
    console.log("Hello from recentCalculations!");
    axios.get('/calculations')
    .then(function(response) {
        if (response.data.length > 0) {
            let recentResult = document.getElementById('recentResult');
            let lastCalc = response.data[response.data.length - 1];
            recentResult.innerHTML = `${lastCalc.numOne} ${lastCalc.operator} ${lastCalc.numTwo} = ${lastCalc.result}`;
        }
    })
    .catch(function(error) {
        console.error('Error with recentCalculations()', error);
    });
}

