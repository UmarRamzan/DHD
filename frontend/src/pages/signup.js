import { useState } from "react";
import { Link } from "react-router-dom";
import { signup_post } from "../API/api";

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

            <form onSubmit={handleSubmit}>
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
                
                <select
                    value={accountType}
                    onChange={(e)=>{setAccountType(e.target.value)}}
                >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="hospital">Hospital</option>
                </select>

                <button>Submit</button>
            </form>
            <Link to="/login">Login</Link>
        </div>  
     );
}
 
export default Signup;