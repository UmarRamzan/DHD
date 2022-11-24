import { useRef, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { UserContext } from "../UserContext";


const Signup = () => {

    const {userID, setUserID} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('patient')
    const [error, setError] = useState('')

    const userRef = useRef()

    const navigate = useNavigate();

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError('')
    }, [email, password, accountType])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Incorrect Email')
        } else if (password.length <= 8) {
            setError('Password must be atleast 8 characters long')
        } else {
            let res = await signup(email, password, accountType)

            if (res.data.is_successful) {
                setUserID(res.data.account_ID)
                navigate("/home");
            } else {
                setError(res.data.error_message)
            }
        }
    }

    return (
        <div className="signup">

            <h1>Sign-up</h1>

            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input 
                    type="text"
                    ref={userRef}
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

                <label>Account Type</label>
                <select value={accountType} onChange={(e)=>{setAccountType(e.target.value)}}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="hospital">Hospital</option>
                </select>

                <button>Next</button>
                <p>{ error }</p>
            </form>

            <Link to="/login">Login</Link>

        </div>
    )
}
 
export default Signup;