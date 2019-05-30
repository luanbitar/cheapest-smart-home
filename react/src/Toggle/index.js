import React from 'react'
import './Toggle.css'

const Toggle = ({ checked, setChecked }) =>
  <label className="rocker">
    <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
    <span className="switch-left">On</span>
    <span className="switch-right">Off</span>
  </label>

export default Toggle