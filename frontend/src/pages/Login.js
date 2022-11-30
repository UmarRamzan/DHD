import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login, patientGetInfo } from "../API/api";
import { UserContext } from "../UserContext";


const Login = () => {

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state) {setError(location.state.message)}
        
    }, [])

    useEffect(() => {
        if (location.state) {setError(location.state.message)}
    }, [location.state])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let res = await login(email, password)
        
        if (res.data.isSuccessful) {

            let userData = await patientGetInfo(res.data.accountID)
            console.log(userData)

            if (userData.data.isSuccessful) {
                setAccountID(res.data.accountID)
                setAccountType(res.data.accountType)
                setAccountName(userData.data.firstName)

                console.log(userData)

                localStorage.setItem('accountID', res.data.accountID)
                localStorage.setItem('accountType', res.data.accountType)
                localStorage.setItem('accountName', userData.data.firstName)

                navigate('/home')

            } else {
                setError(res.data.errorMessage)
            }

        } else {
            setError(res.data.errorMessage)
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
                    type="password"
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