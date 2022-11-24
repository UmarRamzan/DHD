import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { patient_add_entry } from "../API/api";

const PatientInfo = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [day, setDay] = useState('')
    const [gender, setGender] = useState('male')

    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        setError('')
    }, [firstName, lastName, year, month, day, gender])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let userID = localStorage.getItem("userID")
        let date_of_birth = `${year}-${month}-${day}`
        let res = await patient_add_entry(userID, firstName, lastName, date_of_birth, gender)
        console.log(res)

        if (res.data.is_successful) {
            navigate("/home")
            
        } else {
            setError(res.data.error_message)
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

                <label>Year:</label>
                <input 
                    type="text"
                    required
                    value={year}
                    onChange={(e)=>{setYear(e.target.value)}}
                />

                <label>Month:</label>
                <input 
                    type="text"
                    required
                    value={month}
                    onChange={(e)=>{setMonth(e.target.value)}}
                />

                <label>Day:</label>
                <input 
                    type="text"
                    required
                    value={day}
                    onChange={(e)=>{setDay(e.target.value)}}
                />

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