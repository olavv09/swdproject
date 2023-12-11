const numeric = require("numeric");

function processMatrices(req, res) {
  console.log(req.body);
  const matrixPrice = createMatrix(
    req.body.priceWS,
    req.body.priceWH,
    req.body.priceSH
  );
  const matrixAttractions = createMatrix(
    req.body.attractionsWS,
    req.body.attractionsSH,
    req.body.attractionsWH
  );
  const matrixWeather = createMatrix(
    req.body.weatherWS,
    req.body.weatherSH,
    req.body.weatherWH
  );
  const response = [calculateWeights(matrixPrice), calculateWeights(matrixAttractions), calculateWeights(matrixWeather)]
  res.json(JSON.stringify(response))
  // res.json(JSON.stringify(calculateWeights(matrixPrice)))
}

function createMatrix(priceWS, priceWH, priceSH) {
  const matrix = [...Array(3)].map((e) => [1, 1, 1]);

  matrix[0][1] = convertPrice(priceWS);
  matrix[0][2] = convertPrice(priceWH);

  matrix[1][0] = 1 / convertPrice(priceWS);
  matrix[1][2] = convertPrice(priceSH);

  matrix[2][0] = 1 / convertPrice(priceWH);
  matrix[2][1] = 1 / convertPrice(priceSH);

  return consistentMatrix(matrix);
}

function consistentMatrix(matrix) {
  let average0 = (matrix[0][0] + matrix[1][0] + matrix[2][0]);
  let average1 = (matrix[0][1] + matrix[1][1] + matrix[2][1]);
  let average2 = (matrix[0][2] + matrix[1][2] + matrix[2][2]);

  matrix[0][0] = matrix[0][0] / average0;
  matrix[1][0] = matrix[1][0] / average0;
  matrix[2][0] = matrix[2][0] / average0;

  matrix[0][1] = matrix[0][1] / average1;
  matrix[1][1] = matrix[1][1] / average1;
  matrix[2][1] = matrix[2][1] / average1;

  matrix[0][2] = matrix[0][2] / average2;
  matrix[1][2] = matrix[1][2] / average2;
  matrix[2][2] = matrix[2][2] / average2;

  return matrix;
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
  // console.log(criteriaWeights)

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
