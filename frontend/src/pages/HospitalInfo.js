import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hospital_add_entry } from "../API/api";

const HospitalInfo = () => {

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        setError('')
    }, [name, city, address])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let userID = localStorage.getItem("userID")
        let res = await hospital_add_entry(userID, name, city, address)
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
                <label>Name:</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
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

                <button>Submit</button>
            </form>
            <p>{ error }</p>
        </div>
    )
}
 
export default HospitalInfo;