import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { doctorAddEntry } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const DoctorInfo = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState('male')
    const [specialization, setSpecialization] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [timings, setTimings] = useState('')
    const [personalBio, setPersonalBio] = useState('')
    const [onlineAvailability, setOnlineAvailability] = useState('')
    const [charges, setCharges] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [firstName, lastName, dateOfBirth, gender, specialization, city, address, timings, personalBio, onlineAvailability, charges])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'doctor')

        if (accountRes.data.isSuccessful) {
    
            let accountID = accountRes.data.accountID
            localStorage.setItem('accountID', accountID)

            let year = dateOfBirth.getFullYear()
            let month = dateOfBirth.getMonth()
            let day = dateOfBirth.getDay()

            let date = `${year}-${month}-${day}`

            let res = await doctorAddEntry(accountID, firstName, lastName, date, gender)

            if (res.data.isSuccessful) {
                navigate("/home")
                
            } else {
                setError(res.data.errorMessage)
            }
            
        } else {
            setError(accountRes.data.errorMessage)
        }
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
 
export default DoctorInfo;