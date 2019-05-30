import React, { useState, useEffect } from 'react'
import st from './Light.module.css'
import Toggle from '../Toggle/'

const sendStatusMessage = status => fetch(`http://192.168.0.50:3001/${status}`)

function Light() {
  const [light, setLight] = useState(false)
  useEffect(() => { 
    sendStatusMessage(light ? 'on' : 'off')
  })
  return (
    <div className={st.container}>
      <h2>Light</h2>
      <Toggle checked={light} setChecked={setLight} />
    </div>
  )
}
  
export default Light