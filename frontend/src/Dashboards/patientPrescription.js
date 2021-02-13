import React from 'react'
import {Link} from "react-router-dom"
function PatientPrescription() {
    return (
        <div>
           <h1>This is pateint Prescription Dashboard</h1> 
       <Link to = "/patient/dashboard"> <button>Patient Dashboard</button> </Link>
        </div>
    )
}

export default PatientPrescription
