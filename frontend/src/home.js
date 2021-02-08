import React from 'react'
import { withRouter } from 'react-router-dom'
import Navbar from './Landing Page/Navbar'
import { API } from './Backend'

function Home() {
  console.log('API IS', API)
  return (
    <>
      <Navbar />
    </>
  )
}

export default withRouter(Home)
