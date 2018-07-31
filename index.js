const express = require('express')
const path = require('path')

const app = express()

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'))
})

const checkPrime = (number) => {
  const limit = Math.floor(Math.sqrt(number))
  for (let divisor = 2; divisor <= limit; divisor++) {
    if (number % divisor === 0) {
      return false
    }
  }
  return true
}

app.get('/primality/:num', function (req, res) {
  const number = parseInt(req.params['num'])
  if (isNaN(number) || number < 1) {
    res.send({'error': 'Non-integer or negative number found'})
    return
  }
  res.send({'isPrime': checkPrime(number)})
})

app.get('/sumandprimality/:nums', function (req, res) {
  const numbers = []
  let number
  for (let num of req.params['nums'].split(',')) {
    number = parseInt(num)
    if (isNaN(number) || number < 1) {
      res.send({'error': 'Non-integer or negtive number found'})
      return
    }
    numbers.push(number)
  }
  const sum = numbers.reduce((a, b) => a + b)
  const response = {
    'sum': sum,
    'isPrime': checkPrime(sum)
  }
  res.send(response)
})

app.listen(3000)
