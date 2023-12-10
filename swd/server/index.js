const express = require('express')
const cors = require('cors')
const processMatrices = require('./ahp')
const app = express()
const port = 4000

app.use(cors())
app.use(express.json());

app.all("*", (req, res, next) => {
  console.log(`${req.method}: ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.status(200).send();
})

app.post('/ahp', (req, res) => {
  processMatrices(req, res)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})