const fs = require('fs');

// Function to decode the value from a given base
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to perform Lagrange Interpolation
function lagrangeInterpolation(points) {
    let n = points.length;
    let result = 0;

    for (let i = 0; i < n; i++) {
        let xi = points[i][0];
        let yi = points[i][1];

        let term = yi;

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= (0 - xj) / (xi - xj);
            }
        }

        result += term;
    }

    return result;
}

// Function to process the JSON input and compute the constant term 'c'
function findConstantTerm(jsonFile) {
    const data = JSON.parse(fs.readFileSync(jsonFile));

    let n = data.keys.n;
    let k = data.keys.k;

    let points = [];

    // Parse and decode the values
    for (let i = 1; i <= n; i++) {
        if (data[i]) {
            let x = i;
            let base = parseInt(data[i].base);
            let value = data[i].value;

            let y = decodeValue(base, value);
            points.push([x, y]);
        }
    }

    // Use Lagrange Interpolation to calculate the polynomial
    let constantTerm = lagrangeInterpolation(points);

    return constantTerm;
}

// Example usage
let result = findConstantTerm('testcase.json');
console.log("The constant term 'c' is:", result);
