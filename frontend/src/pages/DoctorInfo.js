import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { doctorAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { UserContext } from "../UserContext";

const DoctorInfo = () => {
    const {accountType, setAccountType} = useContext(UserContext)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState('male')
    const [specialization, setSpecialization] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [timings, setTimings] = useState('')
    const [personalBio, setPersonalBio] = useState('')
    const [onlineAvailability, setOnlineAvailability] = useState(false)
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

        let accountID = accountRes.data.accountID

        if (accountRes.data.isSuccessful) {

            let year = dateOfBirth.getFullYear()
            let month = dateOfBirth.getMonth()
            let day = dateOfBirth.getDay()

            let date = `${year}-${month}-${day}`
            let online = onlineAvailability? 1 : 0

            let res = await doctorAddEntry(accountID, firstName, lastName, date, gender, specialization, city, address, timings, personalBio, online, charges)

            if (res.data.isSuccessful) {
                localStorage.setItem('accountType',accountType)
                localStorage.setItem('accountID', accountID)
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

                <label>Specialization:</label>
                <input 
                    type="text"
                    required
                    value={specialization}
                    onChange={(e)=>{setSpecialization(e.target.value)}}
                />

                <label>City:</label>
                <input 
                    type="text"
                    required
                    value={city}
                    onChange={(e)=>{setCity(e.target.value)}}
                />

                <label>Address:</label>
                <input 
                    type="text"
                    required
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                />

                <label>Timings:</label>
                <input 
                    type="text"
                    required
                    value={timings}
                    onChange={(e)=>{setTimings(e.target.value)}}
                />

                <label>Personal Information:</label>
                <input 
                    type="text"
                    required
                    value={personalBio}
                    onChange={(e)=>{setPersonalBio(e.target.value)}}
                />

                <label>Online Availability:</label>
                <input 
                    type="checkbox"
                    onChange={(e)=>{setOnlineAvailability(!onlineAvailability)}}
                />

                <label>Charges:</label>
                <input 
                    type="text"
                    required
                    value={charges}
                    onChange={(e)=>{setCharges(e.target.value)}}
                />

                <button>Submit</button>
            </form>
            <p>{ error }</p>
        </div>
    )
}
 
export default DoctorInfo;