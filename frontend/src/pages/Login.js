import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../API/api";
import { UserContext } from "../UserContext";


const Login = () => {

    const {userID, setUserID} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        let res = await login(email, password)

        console.log(res)
        
        if (res.data.isSuccessful) {
            localStorage.setItem('accountID', res.data.accountID)
            navigate("/home")

        } else {
            setError(res.data.error_message)
        }
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
            <p>{ error }</p>
            <Link to="/signup">Signup</Link>
        </div>  
     );
}
 
export default Login;