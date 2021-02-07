import React from 'react'
import {Link,withRouter} from "react-router-dom"
import {API} from "./Backend"

 function Home() {
     console.log("API IS",API)
    return (
                <>
            <h1>Welcome to medi share.. :)</h1>

            <h1>Register As ?</h1>
          <Link to="/users/register/patient">  <button>Patient</button> </Link>
          <Link to="/users/register/doctor">  <button>Doctor</button> </Link>
         <Link to="/users/register/org">   <button>Organisation</button> </Link>
         <p>Already a user ? </p>
         <Link to="/users/login">   <button>Login</button> </Link>

        </>
    )
}

export default withRouter(Home);
