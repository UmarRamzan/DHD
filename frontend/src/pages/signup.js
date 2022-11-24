import { useState } from "react";
import { Link } from "react-router-dom";
import { signup_post } from "../API/api";
import PatientInfo from "./PatientInfo";

const Signup = () => {
    const [accountType, setAccountType] = useState('patient')

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