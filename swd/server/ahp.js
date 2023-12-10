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
}

function createMatrix(priceWS, priceWH, priceSH) {
  const matrix = [...Array(3)].map((e) => [1, 1, 1]);

  matrix[0][1] = convertPrice(priceWS);
  matrix[0][2] = convertPrice(priceWH);

  matrix[1][0] = convertPrice(priceWS);
  matrix[1][2] = convertPrice(priceSH);

  matrix[2][0] = convertPrice(priceWH);
  matrix[2][1] = convertPrice(priceSH);

  return normalizeMatrix(matrix);
}

function normalizeMatrix(matrix) {
  let average0 = (matrix[0][0] + matrix[1][0] + matrix[2][0]) / 3;
  let average1 = (matrix[0][1] + matrix[1][1] + matrix[2][1]) / 3;
  let average2 = (matrix[0][2] + matrix[1][2] + matrix[2][2]) / 3;

  matrix[0][0] = matrix[0][0] / average0;
  matrix[1][0] = matrix[1][0] / average0;
  matrix[2][0] = matrix[2][0] / average0;

  matrix[0][1] = matrix[0][1] / average1;
  matrix[1][1] = matrix[1][1] / average1;
  matrix[2][1] = matrix[2][1] / average1;

  matrix[0][2] = matrix[0][0] / average2;
  matrix[1][2] = matrix[1][0] / average2;
  matrix[2][2] = matrix[2][0] / average2;

  return matrix;
}

function calculateWeights(matrix) {
  const eigen = numeric.eig(matrix);

  const maxEigenvalueIndex = eigen.lambda.x.indexOf(
    Math.max(...eigen.lambda.x)
  );

  const maxEigenvector = eigen.E.x[maxEigenvalueIndex];

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
