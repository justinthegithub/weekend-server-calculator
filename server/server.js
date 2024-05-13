const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

let calculations = [];

app.get('/calculations', (req, res) => {
    res.status(200).json(calculations);
});

app.post('/calculations', (req, res) => {
    const { numOne, numTwo, operator } = req.body;
    const result = decideCalculation(numOne, numTwo, operator);
    const newCalculation = { numOne, numTwo, operator, result };
    calculations.push(newCalculation);
    res.status(201).json(newCalculation);
});

function decideCalculation(numOne, numTwo, operator) {
    numOne = Number(numOne);
    numTwo = Number(numTwo);
    switch (operator) {
        case '+': return numOne + numTwo;
        case '-': return numOne - numTwo;
        case '*': return numOne * numTwo;
        case '/': return numOne / numTwo;
        default: return NaN;
    }
}

const server = app.listen(PORT, () => console.log(`Server running on: ${PORT}`));

// For testing purposes:
if (process.env.NODE_ENV === 'test') {
    app.setCalculations = (calculationsToSet) => { calculations = calculationsToSet; };
    app.closeServer = () => { server.close(); };
}

module.exports = app;
