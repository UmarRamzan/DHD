import { useState } from "react";
import { Link } from "react-router-dom";
import { patient_add_entry, signup_post } from "../API/api";

const PatientInfo = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        signup_post(email, password, 'patient')
        .then((res) => {console.log(res);patient_add_entry(res.data.account_ID, firstName, lastName)})
    }

    return ( 
        <div className="signup">

            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input 
                    type="text"
                    required
                    value={firstName}
                    onChange={(e)=>{setFirstName(e.target.value)}}
                />

                <label>Last Name:</label>
                <input 
                    type="text"
                    required
                    value={lastName}
                    onChange={(e)=>{setLastName(e.target.value)}}
                />

                <label>Date of Birth</label>

                <label>Year:</label>
                <input 
                    type="text"
                    required
                    value={year}
                    onChange={(e)=>{setYear(e.target.value)}}
                />

                <label>Month:</label>
                <input 
                    type="text"
                    required
                    value={month}
                    onChange={(e)=>{setMonth(e.target.value)}}
                />

                <label>Day:</label>
                <input 
                    type="text"
                    required
                    value={day}
                    onChange={(e)=>{setDay(e.target.value)}}
                />

                <label>Email:</label>
                <input 
                    type="text"
                    required
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />

                <label>Password:</label>
                <input 
                    type="text"
                    required
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />

                <button>Submit</button>
            </form>
        </div>  
     );
}
 
export default PatientInfo;