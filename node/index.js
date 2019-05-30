const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const five = require("johnny-five")
const board = new five.Board()

const app = module.exports = express()
let led = null

const setLedPower = power => (req, res) => {
  if(!led) return
  if(power === 'TOGGLE') led.toggle()
  else if(power) led.on()
  else led.off()
  if(res) res.send('Hello from root route.' + JSON.stringify(power))
}

app.use(helmet())
app.use(cors())
app.get('/', setLedPower('TOGGLE'))
app.get('/on', setLedPower(true))
app.get('/off', setLedPower(false))

board.on("ready", () => led = new five.Led(13))

if(!module.parent)
  app.listen(3001)