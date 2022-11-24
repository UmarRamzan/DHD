import { useState } from "react";
import { Link } from "react-router-dom";
import { signup_post } from "../API/api";
import PatientInfo from "./PatientInfo";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('patient')

    const handleSubmit = (e) => {
        e.preventDefault()
        signup_post(email, password, accountType)
        .then((res) => {console.log(res)})
    }

    return ( 
        <div className="signup">
            <h1>Signup</h1>

            <label>Account Type</label>
            <select
                value={accountType}
                onChange={(e)=>{setAccountType(e.target.value)}}
            >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="hospital">Hospital</option>
            </select>

            {accountType == 'patient' && <PatientInfo/>}
            <Link to="/login">Login</Link>
        </div>  
     );
}
 
export default Signup;