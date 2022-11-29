import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { patientAddEntry } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const PatientInfo = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState('male')

    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        setError('')
    }, [firstName, lastName, dateOfBirth, gender])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let userID = localStorage.getItem("userID")
        let res = await patientAddEntry(userID, firstName, lastName, dateOfBirth, gender)

        if (res.data.isSuccessful) {
            navigate("/home")
            
        } else {
            setError(res.data.errorMessage)
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
 
export default PatientInfo;