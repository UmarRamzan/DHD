import { useState } from "react";
import { Link } from "react-router-dom";
import { login_post } from "../API/api";


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        login_post(email, password)
    }

    return ( 
        <div className="login">
            <h1>Login</h1>

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

                <button>Submit</button>
            </form>
        <Link to="/signup">Signup</Link>
        </div>  
     );
}
 
export default Login;