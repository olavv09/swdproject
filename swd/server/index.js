const express = require('express');
const cors = require('cors');
const processMatrices = require('./ahp');
const fs = require('fs');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.all('*', (req, res, next) => {
  console.log(`${req.method}: ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).send();
});

app.post('/ahp', (req, res) => {
  processMatrices(req, res);
  saveCompletedSurvey(req.body); // Dodaj tę linijkę, aby zapisywać wyniki
});

// Funkcja zapisująca wyniki ankiety do pliku completedsurveys.json
const saveCompletedSurvey = (results) => {
  const completedSurveys = fs.existsSync('completedsurveys.json')
    ? JSON.parse(fs.readFileSync('completedsurveys.json', 'utf-8'))
    : [];

  completedSurveys.push(results);

  fs.writeFileSync('completedsurveys.json', JSON.stringify(completedSurveys, null, 2));
};

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
