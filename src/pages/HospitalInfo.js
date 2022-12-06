import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { hospitalAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import { UserContext } from "../UserContext";

const HospitalInfo = () => {
    const {accountType, setAccountType} = useContext(UserContext)
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [name, city, address])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'hospital')

        if (accountRes.data.isSuccessful) {
    
            let accountID = accountRes.data.
            localStorage.setItem('accountType',accountType)
            localStorage.setItem('accountID', accountID)

            let res = await hospitalAddEntry(accountID, name, city, address)

            if (res.data.isSuccessful) {
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