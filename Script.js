document.addEventListener('DOMContentLoaded', () => {
    const num1NumeratorInput = document.getElementById('num1Numerator');
    const num1DenominatorInput = document.getElementById('num1Denominator');
    const num2NumeratorInput = document.getElementById('num2Numerator');
    const num2DenominatorInput = document.getElementById('num2Denominator');
    const addBtn = document.getElementById('addBtn');
    const subtractBtn = document.getElementById('subtractBtn');
    const multiplyBtn = document.getElementById('multiplyBtn');
    const divideBtn = document.getElementById('divideBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultDisplay = document.getElementById('result');

    let currentOperation = '+'; // Default operation

    // Function to find the Greatest Common Divisor (GCD)
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }

    // Function to simplify a fraction
    function simplifyFraction(numerator, denominator) {
        if (denominator === 0) {
            return { numerator: NaN, denominator: NaN }; // Indicate error
        }
        if (numerator === 0) {
            return { numerator: 0, denominator: 1 };
        }

        const commonDivisor = gcd(Math.abs(numerator), Math.abs(denominator));
        return {
            numerator: numerator / commonDivisor,
            denominator: denominator / commonDivisor
        };
    }

    // Event listeners for operation buttons
    addBtn.addEventListener('click', () => {
        currentOperation = '+';
        updateOperatorButtonStyles(addBtn);
    });
    subtractBtn.addEventListener('click', () => {
        currentOperation = '-';
        updateOperatorButtonStyles(subtractBtn);
    });
    multiplyBtn.addEventListener('click', () => {
        currentOperation = '*';
        updateOperatorButtonStyles(multiplyBtn);
    });
    divideBtn.addEventListener('click', () => {
        currentOperation = '/';
        updateOperatorButtonStyles(divideBtn);
    });

    // Initial style update for the default operation
    function updateOperatorButtonStyles(activeButton) {
        const buttons = [addBtn, subtractBtn, multiplyBtn, divideBtn];
        buttons.forEach(btn => {
            if (btn === activeButton) {
                btn.style.backgroundColor = '#0056b3'; // Darker blue for active
                btn.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.2)';
            } else {
                btn.style.backgroundColor = '#007bff'; // Original blue
                btn.style.boxShadow = 'none';
            }
        });
    }
    updateOperatorButtonStyles(addBtn); // Set initial active button

    calculateBtn.addEventListener('click', () => {
        const num1N = parseFloat(num1NumeratorInput.value);
        const num1D = parseFloat(num1DenominatorInput.value);
        const num2N = parseFloat(num2NumeratorInput.value);
        const num2D = parseFloat(num2DenominatorInput.value);

        if (isNaN(num1N) || isNaN(num1D) || isNaN(num2N) || isNaN(num2D)) {
            resultDisplay.textContent = 'Please enter valid numbers for all fields.';
            resultDisplay.style.color = 'red';
            return;
        }

        if (num1D === 0 || num2D === 0) {
            resultDisplay.textContent = 'Denominator cannot be zero!';
            resultDisplay.style.color = 'red';
            return;
        }

        let resultNumerator, resultDenominator;

        switch (currentOperation) {
            case '+':
                resultNumerator = (num1N * num2D) + (num2N * num1D);
                resultDenominator = num1D * num2D;
                break;
            case '-':
                resultNumerator = (num1N * num2D) - (num2N * num1D);
                resultDenominator = num1D * num2D;
                break;
            case '*':
                resultNumerator = num1N * num2N;
                resultDenominator = num1D * num2D;
                break;
            case '/':
                if (num2N === 0) {
                    resultDisplay.textContent = 'Cannot divide by zero!';
                    resultDisplay.style.color = 'red';
                    return;
                }
                resultNumerator = num1N * num2D;
                resultDenominator = num1D * num2N;
                break;
        }

        const simplifiedResult = simplifyFraction(resultNumerator, resultDenominator);

        if (isNaN(simplifiedResult.numerator) || isNaN(simplifiedResult.denominator)) {
             resultDisplay.textContent = 'Error in calculation.';
             resultDisplay.style.color = 'red';
        } else if (simplifiedResult.denominator === 1) {
            resultDisplay.textContent = simplifiedResult.numerator;
            resultDisplay.style.color = '#007bff';
        } else {
            resultDisplay.textContent = `${simplifiedResult.numerator} / ${simplifiedResult.denominator}`;
            resultDisplay.style.color = '#007bff';
        }
    });
});
