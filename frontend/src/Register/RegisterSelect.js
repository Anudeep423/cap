import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export default function RegisterSelect() {
  return (
    <div className='wrapper'>
      <div className='title'>Register As</div>
      <div className='form'>
        <div className='inputfield'>
          <Link to='/users/register/patient' className='btn'>
            <button className='btn'>User</button>
          </Link>
        </div>
        <div className='inputfield'>
          <Link to='/users/register/doctor' className='btn'>
            <button className='btn'>Doctor</button>
          </Link>
        </div>
        <div className='inputfield'>
          <Link to='/users/register/org' className='btn'>
            <button className='btn'>Organisation</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
