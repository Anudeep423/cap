import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
import {getPres} from "../CallingApi/patientapi"
function PatientPrescription({history}) {

     useEffect( async () => {
        await getPres(history.location.state).
        then(data => {console.log(data)}).
        catch(err => {console.log(err)})
     }  )       

    console.log(history)
    return (
        <div>
           <h1>This is pateint Prescription Dashboard</h1> 
       <Link to = "/patient/dashboard"> <button>Patient Dashboard</button> </Link>
        </div>
    )
}

export default PatientPrescription
