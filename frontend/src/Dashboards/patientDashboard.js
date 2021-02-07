import React,{useState,useEffect} from 'react'
import {signout,pat_dets,getPatDetails,updatePatDetails} from "../CallingApi/patientapi"
import { signup } from '../CallingApi/patientapi'
import {Link} from "react-router-dom"
const PatientDashboard = ({props,history}) => {

    const [name,setName] = useState("");
    useEffect(() => {
      const Name =  JSON.parse(localStorage.getItem("jwt"));
        setName(Name.user.patient_name) 
    }, [])
   
    const [values, SetValues] = useState({
        age : "",
        gender : "",
        bloodgroup : "",
        allergies : "",
        occur_cond : "",
        medication : "",
        emergency_no : "",
        error : "",
        message : "",
        loading : "",
        success : false,
        editDetails : false
      })
    
      const {
        age,
        gender ,
        bloodgroup ,
        allergies ,
        occur_cond ,
        medication ,
        emergency_no,
        error,
        message,
        success,
        editDetails
      } = values

      const [edit,setEdits] = useState({e_age : "",
      e_gender : "",
      e_bloodgroup : "",
      e_allergies : "",
      e_occur_cond : "",
      e_medication : "",
      e_emergency_no : ""})

      const {
        e_id ,
        e_age,
        e_gender ,
        e_bloodgroup ,
        e_allergies ,
        e_occur_cond ,
        e_medication ,
        e_emergency_no
      } = edit


//  SetValues({...values,age : res[0].age,gender : res[0].gender , bloodgroup : res[0].bloodgroup,allergies : res[0].allergies,
// occur_cond : res[0].occur_cond , medication : res[0].medication , emergency_no : res[0].emergency_no
// })
      let t = {}
      t = JSON.parse(localStorage.getItem("jwt"))
        let uid  = t.user._id
          useEffect(() => {
            getPatDetails(uid)
            .then(res => { 
              console.log(res)
              if(res.message || res.length === 0){
              SetValues({...values,success : false ,error : res.message})
              }else{
                  SetValues({...values,success : true})
                
              }
              const e = {...res[0]}
              console.log(e._id);
              setEdits({e_id : e._id ,e_age : e.age,e_gender : e.gender , e_bloodgroup : e.bloodgroup,
                e_allergies : e.allergies ,
                e_occur_cond : e.occur_cond,
                e_medication : e.medication,
                e_emergency_no : e.emergency_no}) 
              console.log(res);
            })

            .catch(err => {console.log(err)})
          }, [message,editDetails])

  
    
    //   const patient_name = name
    //   const patient_email = email
    //   const patient_phone_no = phone_no
    
    console.log("PatientDashboard",  t.user._id );
    
      const handleChange = (e) => {
        const store = e.target.name
        SetValues({ ...values, [store]: e.target.value })
      }

      const e_handleChange = (e) => {
        const store = e.target.name
        setEdits({ ...edit, [store]: e.target.value })
      }
      const Age = parseInt(age);
      const Emergency_no = parseInt(emergency_no)
       const onSubmit = (e) => {
         if(!age ||
          !gender ||
          !bloodgroup ||
          !allergies ||
          !occur_cond ||
          !medication ||
          !emergency_no){
            alert("Enter all details")
          }
        e.preventDefault();
        pat_dets(
          {
            id : uid,
            age : Age,
            gender ,
            bloodgroup ,
            allergies ,
            occur_cond ,
            medication ,
            emergency_no : Emergency_no
          }
        )
          .then((data) => {
            if (data.msg) {
              SetValues({ ...values, error : data.msg, message : '' })
            } else {
              SetValues({ ...values, error : '', message : data.message })
            }
          })
          .catch((err) => console.log(err.message))
      }

      const e_onSubmit = (e) => {
        e.preventDefault()
          if( !e_age ||
            !e_gender ||
            !e_bloodgroup ||
            !e_allergies ||
            !e_occur_cond ||
            !e_medication ||
            !e_emergency_no){
              alert("fileds cannot be left empty");
            }else{
              
              updatePatDetails(
                {
                  id : e_id,
                  age : parseInt(e_age),
                  gender : e_gender,
                  bloodgroup : e_bloodgroup ,
                  allergies  : e_allergies,
                  occur_cond : e_occur_cond,
                  medication : e_medication,
                  emergency_no : parseInt(e_emergency_no)
                },e_id
              )
                .then((data) => {
                  console.log(data);
                  if (data.msg) {
                    SetValues({ ...values, error : data.msg, message : '' })
                  } else {
                    SetValues({ ...values, error : '', message : data.message })
                  }
                })
                .catch((err) => console.log(err.message))

            }

      }

      const userForm = (status) => (
        <div className='wrapper'>
        <div className='title'>{status}</div> 
        <div className='form'>
          <div className='inputfield'>
            <label>Age</label>
            <input
              required
              type='text'
              name='age'
              onChange={handleChange}
              value={age}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Gender</label>
            <input
              required
              type='text'
              name='gender'
              onChange={handleChange}
              value={gender}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Bloodgroup</label>
            <input
              required
              type='text'
              name='bloodgroup'
              onChange={handleChange}
              value={bloodgroup}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Allergies</label>
            <input
              required
              type='text'
              name='allergies'
              className='input'
              onChange={handleChange}
              value={allergies}
            />
          </div>
          <div className='inputfield'>
            <label>Occured Condition</label>
            <input
              required
              name='occur_cond'
              className='input'
              onChange={handleChange}
              value={occur_cond}
            />
          </div>
          <div className='inputfield'>
            <label>Medication</label>
            <input
              required
              name='medication'
              className='input'
              onChange={handleChange}
              value={medication}
            />
          </div>
          <div className='inputfield'>
            <label>Emergency Number</label>
            <input
              required
              name='emergency_no'
              className='input'
              onChange={handleChange}
              value={emergency_no}
            />
          </div>
          <div className='inputfield'>
            <button onClick = {onSubmit} className='btn'>
              Submit
            </button>
            
          </div>
          
       
          
        </div>
        
        {error ?  <p>{error}</p> : <p>{message}</p>}
        
      </div>
      )

      const editForm = () => (
        <div className='wrapper'>
        <div className='title'>Edit your basic details</div> 
        <div className='form'>
          <div className='inputfield'>
            <label>Age</label>
            <input
              required
              type='text'
              name='e_age'
              onChange={e_handleChange}
              value={e_age}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Gender</label>
            <input
              required
              type='text'
              name='e_gender'
              onChange={e_handleChange}
              value={e_gender}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Bloodgroup</label>
            <input
              required
              type='text'
              name='e_bloodgroup'
              onChange={e_handleChange}
              value={e_bloodgroup}
              className='input'
            />
          </div>
          <div className='inputfield'>
            <label>Allergies</label>
            <input
              required
              type='text'
              name='e_allergies'
              className='input'
              onChange={e_handleChange}
              value={e_allergies}
            />
          </div>
          <div className='inputfield'>
            <label>Occured Condition</label>
            <input
              required
              name='e_occur_cond'
              className='input'
              onChange={e_handleChange}
              value={e_occur_cond}
            />
          </div>
          <div className='inputfield'>
            <label>Medication</label>
            <input
              required
              name='e_medication'
              className='input'
              onChange={e_handleChange}
              value={e_medication}
            />
          </div>
          <div className='inputfield'>
            <label>Emergency Number</label>
            <input
              required
              name='e_emergency_no'
              className='input'
              onChange={e_handleChange}
              value={e_emergency_no}
            />
          </div>
          <div className='inputfield'>
            <button onClick = {e_onSubmit} className='btn'>
              Submit
            </button>
          </div>
          {message ? <p>{message}</p>  : "" }
          <Link><button onClick = { () => {SetValues({...values,editDetails : false,message : ""})  
          setEdits({e_age : "",
          e_gender : "",
          e_bloodgroup : "",
          e_allergies : "",
          e_occur_cond : "",
          e_medication : "",
          e_emergency_no : ""})
        } } >Pateint Dasboard</button></Link>
        </div>
        
      </div>
      )
      
    return (
        
        <div> 
          <h1>Welcome {name}</h1>
          <button  onClick = { () => {signout( () => {history.push("/users/login")} )}  }>signout</button>
          <h1>Patient Dashboard</h1>
           {success ? <p>You Have Given Your Basic Details</p> : userForm("Enter Your basic details")    }
           {success && !editDetails ? <div > <h1>Your basic Details : </h1> 
           <br></br>
           <h3>Age : {e_age}</h3>
           <br></br>
           <h3>Gender : {e_gender}</h3>
           <br></br>
           <h3>Bloodgroup : {e_bloodgroup}</h3>
           <br></br>
           <h3>Allergies : {e_allergies}</h3>
           <br></br>
           <h3>Occured Condition : {e_occur_cond}</h3>
           <br></br>
           <h3>Medication : {e_medication}</h3>
           <br></br>
           <h3>Emergency Number : {e_emergency_no}</h3>
           </div> : ""}
           
            {success && !editDetails? <> <br></br> <button onClick = { () => { SetValues({...values,editDetails : true}) }}>Edit your details</button> </>  : ""}
          {!success ? <Link to ="/patient/dashboard"> <button >User Dashboard</button> </Link>  : ""}
          {editDetails ? editForm() : <p></p> }
          {editDetails ?  <button onClick = { () => { SetValues({...values,editDetails : false})
           }}>Edit Later</button>  : "" }
           {JSON.stringify(values)}
           {JSON.stringify(edit)}
        </div>
    )
}

export default PatientDashboard
