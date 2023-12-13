// ahp.js
function processMatrices(req, res) {
  console.log(req.body)
  const data = []
  for (const [key, value] of Object.entries(req.body)) {
    if (value && key !== "criteriaCount" && key !== "variantsCount") {
      data.push(value)
    }
  }
  const matrices = []
  for(let i = 0; i < req.body.criteriaCount; i++) {
    if (req.body.variantsCount === 3) {
      matrices.push(create3x3Matrix(...data.slice(0+(i*req.body.variantsCount), req.body.variantsCount+(i*req.body.variantsCount))))
    } else {
      matrices.push(create2x2Matrix(...data.slice(0+(i*req.body.variantsCount), req.body.variantsCount+(i*req.body.variantsCount))))
    }
  }

  const response = matrices.map((elem) => {
    return calculateWeights(elem)
  })
  res.json(JSON.stringify(response))
}

function create2x2Matrix(criteria1AB) {
  const matrix = [...Array(2)].map((e) => [1, 1]);

  matrix[0][1] = convertPrice(criteria1AB);

  matrix[1][0] = 1 / convertPrice(criteria1AB);
  return consistentMatrix(matrix);
}

function create3x3Matrix(criteria1AB, criteria1AC, criteria1BC) {
  const matrix = [...Array(3)].map((e) => [1, 1, 1]);

  matrix[0][1] = convertPrice(criteria1AB);
  matrix[0][2] = convertPrice(criteria1AC);

  matrix[1][0] = 1 / convertPrice(criteria1AB);
  matrix[1][2] = convertPrice(criteria1BC);

  matrix[2][0] = 1 / convertPrice(criteria1AC);
  matrix[2][1] = 1 / convertPrice(criteria1BC);
  return consistentMatrix(matrix);
}

function consistentMatrix(matrix) {
  let average = [...Array(matrix.length)].map((e) => 0);

  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix.length; j++) {
      average[i] += matrix[j][i]
    }
  }

  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix.length; j++) {
      matrix[i][j] = matrix[i][j] / average[j]
    }
  }
  return matrix
}

function calculateWeights(matrix) {
  const maxEigenvector = powerMethod(matrix, 1000);

  const normalizedEigenvector = normalizeVector(maxEigenvector);

  const sumOfWeights = normalizedEigenvector.reduce(
    (sum, weight) => sum + weight,
    0
  );
  const criteriaWeights = normalizedEigenvector.map(
    (weight) => weight / sumOfWeights
  );

  return criteriaWeights;
}

function powerMethod(matrix, numIterations) {
  // Inicjalizacja losowego wektora startowego
  let vector = [];
  for (let i = 0; i < matrix.length; i++) {
      vector.push(Math.random());
  }

  // Iteracyjne mnożenie macierzy przez wektor
  for (let iteration = 0; iteration < numIterations; iteration++) {
      // Mnożenie macierzy przez wektor
      let result = matrixVectorMultiply(matrix, vector);

      // Normalizacja wyniku
      let norm = Math.sqrt(result.reduce((sum, val) => sum + val ** 2, 0));
      vector = result.map(val => val / norm);
  }
  return vector;
}

function matrixVectorMultiply(matrix, vector) {
  return matrix.map(row => row.reduce((sum, val, index) => sum + val * vector[index], 0));
}

function normalizeVector(vector) {
  const sumOfSquares = vector.reduce((sum, element) => sum + element ** 2, 0);
  const squareRootSum = Math.sqrt(sumOfSquares);
  const normalizedVector = vector.map(element => Math.abs(element / squareRootSum));
  return normalizedVector
}

function convertPrice(originalPrice) {
  const lookupTable = [
    1 / 9,
    2 / 9,
    3 / 9,
    4 / 9,
    5 / 9,
    6 / 9,
    7 / 9,
    8 / 9,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ];
  return lookupTable[Number.parseInt(originalPrice)];
}

module.exports = processMatrices;
