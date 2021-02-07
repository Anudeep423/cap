import React,{useState} from 'react'
import {Link,Redirect} from "react-router-dom"
import {signin,authenticate,isAutheticated} from "../CallingApi/patientapi"
import {signout} from "../CallingApi/patientapi"
function LoginForm(props) {
    const [values,setValues] = useState({email : "" ,password : "",error : "",success : "",performRedirect : false });  

    const {user} = isAutheticated();
    console.log("From is auth ",user)

    const onchange = (e) => {
        setValues({...values,[e.target.name] : e.target.value })
    }
    const {email,password,error,success,performRedirect} = values;
    const onsubmit = (e) => {
        e.preventDefault();
        if(email && password){
        signin({email,password},props.location.pathname).then(data => {
          console.log(data);
        if(data.msg){
            setValues({...values,error : data.msg})
        }else{
            authenticate(data,() => {setValues({...values,performRedirect : true})})
        }
        }).catch(err => console.log(err.message));
        }else{
            alert("Enter all details")
        }
    }
    const performRedirects  = () => {
        if(performRedirect){
            if(user.patient_name){
                return <Redirect  to = "/patient/dashboard"/>
            }else if(user.org_name){
                return <Redirect to = "/org/dashboard" />
            }else if(user.doctor_name){
                return <Redirect to="/doctor/dashboard"/>
            }
        }
    }
    return (
        <div>
            <h1>Login here</h1>
            <input placeholder="Enter Email" name = "email" onChange = {onchange} value={email} />
            <br></br>
            <input placeholder="Enter passowrd" name = "password" onChange={onchange}  value={password}/>
            <br></br>
            <button  onClick ={onsubmit}>Submit</button>
            <Link to = "/"> <button> Home </button>  </Link>
            {error ?  <p>{error}</p> : <p>{success}</p>}
            {JSON.stringify(values)}
            {performRedirects()}
        </div>
    )
}

export default LoginForm
