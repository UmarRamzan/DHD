import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { patientAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { UserContext } from "../UserContext";

const PatientInfo = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState('male')

    const [error, setError] = useState('')

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [firstName, lastName, dateOfBirth, gender])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'patient')

        if (accountRes.data.isSuccessful) {
    
            let accountID = accountRes.data.accountID
            setAccountID(accountID)
            localStorage.setItem('accountType',accountType)
            localStorage.setItem('accountID', accountID)

            let year = dateOfBirth.getFullYear()
            let month = dateOfBirth.getMonth()
            let day = dateOfBirth.getDay()

            let date = `${year}-${month}-${day}`

            let res = await patientAddEntry(accountID, firstName, lastName, date, gender)

            if (res.data.isSuccessful) {
                setAccountID(accountID)
                setAccountName(firstName)
                setAccountType('patient')
                
                localStorage.setItem('accountID', accountID)
                localStorage.setItem('accountName', accountName)
                localStorage.setItem('accountType', accountType)

                navigate("/home")
                
            } else {
                removeAccount(accountID)
                setError(res.data.errorMessage)
            }
            
        } else {
            setError(accountRes.data.errorMessage)
        }
    }

    return ( 
        <div className="signup">

            <h2>Personal Information</h2>

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
                <DatePicker onChange={(date) => {setDateOfBirth(date)}} selected={dateOfBirth}/>

                <label>Gender</label>
                <select value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>

                <button>Submit</button>
            </form>
            <p>{ error }</p>
        </div>
    )
}
 
export default PatientInfo;