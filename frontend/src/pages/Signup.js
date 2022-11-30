import { useRef, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { validateEmail } from "../API/api";


const Signup = () => {

    const navigate = useNavigate()

    //const {userID, setUserID} = useContext(UserContext)
    const {accountType, setAccountType} = useContext(UserContext)


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accType, setAccType] = useState('patient')
    const [error, setError] = useState('')

    const userRef = useRef()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setError('')
    }, [email, password, accType])

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Incorrect Email')
        } else if (password.length <= 8) {
            setError('Password must be atleast 8 characters long')
        } else {
            let res = await validateEmail(email)
            if (res.data.isSuccessful) {
                setAccountType(accType)
                navigate(`/signup/${accType}`, { state: { email: email, password: password } })
            } else {
                setError(res.data.errorMessage)
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
                <select value={accType} onChange={(e)=>{setAccType(e.target.value)}}>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="hospital">Hospital</option>
                </select>

                <button>Next</button>
                <p>{ error }</p>
            </form>

        </div>
    )
}
 
export default Signup;