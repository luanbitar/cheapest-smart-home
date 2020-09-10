const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const five = require("johnny-five")
const EtherPortClient = require("etherport-client").EtherPortClient;

const espConfig = new EtherPortClient({
  host: "192.168.1.102",
  port: 3030
})

const app = module.exports = express()
let led = null

const setLedPower = power => (req, res) => {
  if(!led) return
  if(power === 'TOGGLE') {
    led.off()
    setTimeout(() => {
      led.on()
    }, 500)
  }
  else if(power) led.on()
  else led.off()
  if(res) res.send('Hello from root route. led pulsed')
}

function onConnect(req, res) {
  const esp = new five.Board({
    port: espConfig,
    repl: false
  })

  esp.on("ready", () => {
    led = new five.Led(2)
    res.send("connected to esp")
  })
}

app.use(helmet())
app.use(cors())
app.get('/', setLedPower('TOGGLE'))
app.get('/on', setLedPower(true))
app.get('/off', setLedPower(false))
app.get('/connect', onConnect)



if(!module.parent)
  app.listen(3001)
