import React,{useEffect,useState} from 'react'
import {signout,getAllPatientDetails} from "../CallingApi/patientapi"

function DoctorDashboard({history}) {
    const [PatientBasicDetails,setPatientBasicDetails] = useState([]);
    const [doctorDetails,setDoctorDetials] = useState("");
    const [values,setValues] = useState("");
    const [p_dets,setP_dets] = useState([])
    const [displayDetails,setDisplayDetails] = useState(false)

    useEffect(() => { 
        const doc = JSON.parse(localStorage.getItem("jwt"))
           setDoctorDetials(doc.user.doctor_name)
           getAllPatientDetails()
           .then(res => {  setPatientBasicDetails(res)   })
           .catch(err => {console.log(err)});

        },[])

       const onSubmit = () => {
           const patDets = PatientBasicDetails
            console.log(patDets.data);
        const pat_Index =  patDets.data.filter( (data,i) => {
                if(values ===  "" + data.userinfo.UID){
                    return data
            }
            }  )

            console.log(pat_Index[0]);

            if(pat_Index[0]){
                setP_dets(pat_Index[0])
                if(pat_Index[0].userinfo !== "" + undefined){
                setDisplayDetails(true)
                }
            }else{
                alert("No Pateint Found with this Unique ID")
            }

            
            //console.log(data.patient.UID);
        //   patDets.data.map((data,i) => {
        //       console.log(data);
        //   } )
       }


    console.log(doctorDetails);
    return (
        <div>
            <h3>This is doctor dashboard    </h3>

            <h2>{doctorDetails ?  <h2>Welcome Dr. {doctorDetails}</h2> : "" }</h2>
            <button  onClick = { () => {signout( () => {history.push("/users/login")} )}  }>signout</button>
            <br></br>
            <br></br>
            <h2>Search Patient Details</h2>
            <br></br>
            <input value ={values} onChange = {  (e) => {setValues(e.target.value) }} />
            <button  onClick = {onSubmit}>Submit</button>
            <br></br>
            <br></br>
            { displayDetails ? <>
                {p_dets.userinfo.patient_name ? "" : alert("patient Details not found") }
            <h2>Patient Basic Details : </h2>
            <br></br>
            <h3> Name : {p_dets.userinfo.patient_name}</h3>
            <h3> Age : {p_dets.age}</h3>
            <h3>Gender : {p_dets.gender}</h3>
            <h3>Allergies : {p_dets.allergies}</h3>
            <h3>Bloodgroup : {p_dets.bloodgroup}</h3>
            <h3>Medication : {p_dets.medication}</h3>
            <h3>Occured Condition : {p_dets.occur_cond}</h3>
            <h3>Emergency Number : {p_dets.emergency_no}</h3>

             </> : "" }
            
        </div>
    )
}

export default DoctorDashboard
