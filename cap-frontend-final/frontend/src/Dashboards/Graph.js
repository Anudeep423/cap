import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { addGraphValues, getPatGraph } from '../CallingApi/patientapi'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../Landing Page/Button'
import '../Landing Page/Navbar.css'
import { signout } from '../CallingApi/patientapi'
import Chart from './chart'
import './styles.css'

function Graph({ history }) {
  const doc = JSON.parse(localStorage.getItem('jwt'))
  const doctorName = doc.user.doctor_name
  const UID = history.location.state.userinfo.UID

  const [graphValues, setGraphValues] = useState([])

  // Fetching Api here
  useEffect(() => {
    getPatGraph(UID)
      .then((res) => {
        setGraphValues(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // console.log(graphValues);

  //calculating data for graph value
  // const lastData = graphValues.pop();
  // const a = lastData.Heart_rate;
  // const b = lastData.Blood_pressure;
  // const c = lastData.Cholesterol;
  // const d = lastData.Blood_sugar;
  // const graphData = [a, b, c, d];

  let dateArr = []
  let heart_rate = []
  let blood_pressure = []
  let cholesterol = []
  let blood_sugar = []

  for (var i = 0; i < graphValues.length; i++) {
    const dt = graphValues[i].createdAt
    const date = dt.substring(0, 10)

    heart_rate.push(graphValues[i].Heart_rate)
    blood_pressure.push(graphValues[i].Blood_pressure)
    cholesterol.push(graphValues[i].Cholesterol)
    blood_sugar.push(graphValues[i].Blood_sugar)
    dateArr.push(date)
  }
  // console.log(dateArr);

  const [values, setValues] = useState(
    {
      Heart_rate: '',
      Blood_pressure: '',
      Cholesterol: '',
      Blood_sugar: '',
    },
    []
  )
  const [result, setResult] = useState()
  const [resultValues, setResultValues] = useState([])

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: parseInt(e.target.value) })
  }

  const { Heart_rate, Blood_pressure, Cholesterol, Blood_sugar } = values
  const onClicks = (e) => {
    e.preventDefault()
    addGraphValues({ UID, Doctor: doctorName, ...values })
      .then((res) => {
        setResult(res.message)
        setResultValues(res.result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  //for navbar
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
    window.addEventListener('resize', showButton)
    return () => {
      window.removeEventListener('resize', showButton)
    }
  }, [])
  //
  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className='navbar'>
          <div className='navbar-container container'>
            <Link
              to='/doctor/dashboard'
              className='navbar-logo'
              onClick={closeMobileMenu}>
              Dashboard
            </Link>
            <div className='menu-icon' onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/doctor/AddingFeatures',
                        history.location.state
                      )
                    })
                  }>
                  Basic Details
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/doctor/AddingFeatures/graph',
                        history.location.state
                      )
                    })
                  }>
                  Health Status
                </div>
              </li>
              <li className='nav-item'>
                <div
                  className='nav-links'
                  onClick={
                    (closeMobileMenu,
                    () => {
                      history.push(
                        '/doctor/AddingFeatures/prescription',
                        history.location.state
                      )
                    })
                  }>
                  Prescriptions
                </div>
              </li>
              <li className='nav-btn'>
                {button ? (
                  <Button
                    buttonStyle='btn--outline'
                    onClick={() => {
                      signout(() => {
                        history.push('/users/login')
                      })
                    }}>
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    buttonStyle='btn--outline'
                    buttonSize='btn--mobile'
                    onClick={
                      (closeMobileMenu,
                      () => {
                        signout(() => {
                          history.push('/users/login')
                        })
                      })
                    }>
                    Sign Out
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
      <div>
        {/*<h1>Add Graph here</h1>
        <Link to='/doctor/dashboard'>
          {' '}
          <button>Go back To Dashboard</button>{' '}
        </Link>
        <button
          onClick={() => {
            history.push('/doctor/AddingFeatures', history.location.state)
          }}>
          Go back Upload Panal
        </button>*/}

        <input
          placeholder='Heart_rate'
          name='Heart_rate'
          onChange={onChange}
          value={Heart_rate}></input>
        <br></br>
        <input
          placeholder='Blood_pressure'
          name='Blood_pressure'
          onChange={onChange}
          value={Blood_pressure}></input>
        <br></br>
        <input
          placeholder='Cholesterol'
          name='Cholesterol'
          onChange={onChange}
          value={Cholesterol}></input>
        <br></br>
        <input
          placeholder='Blood_sugar'
          name='Blood_sugar'
          onChange={onChange}
          value={Blood_sugar}></input>
        <br></br>
        <br></br>
        <button onClick={onClicks}>Submit </button>
        {result ? <p style={{ color: 'green' }}>{result}</p> : ''}
        {/* {JSON.stringify(resultValues)}
             {JSON.stringify(values)} */}
        {/* {JSON.stringify(graphValues)} */}
      </div>
      <div>
        <div>
          <div>
            <Chart
              className='chart'
              labels={dateArr}
              name={'Heart Rate'}
              dataVal={heart_rate}
            />
          </div>
          <div>
            <Chart
              className='chart'
              labels={dateArr}
              name={'Blood Pressure'}
              dataVal={blood_pressure}
            />
          </div>
        </div>
        <div>
          <div>
            <Chart
              className='chart'
              labels={dateArr}
              name={'Cholesterol'}
              dataVal={cholesterol}
            />
          </div>
          <div>
            <Chart
              className='chart'
              labels={dateArr}
              name={'Blood Bugar'}
              dataVal={blood_sugar}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Graph
