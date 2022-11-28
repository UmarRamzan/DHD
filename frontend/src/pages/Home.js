import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../API/api";
import { UserContext } from "../UserContext";
import Select from 'react-select';

const Home = () => {

    const {userID, setUserID} = useContext(UserContext)

    const [searchString, setSearchString] = useState('')
    const [city, setCity] = useState('lahore')
    const [hospitalResults, setHospitalResults] = useState(null)
    const [doctorResults, setDoctorResults] = useState(null)

    const handleSearch = async () => {
        if (searchString == '') {
            setHospitalResults('')
            setDoctorResults('')
        } else {
            let res = await search(searchString, city)
            console.log(res.data)
            setDoctorResults(res.data.doctor_list)
            setHospitalResults(res.data.hospital_list)
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        setUserID(null)
    }

    setUserID(localStorage.getItem("userID"))

    useEffect(() => {
        handleSearch()
    }, [searchString, city])

    return ( 
        <div className="home">
            
            <h1>Home</h1>

            <label>City</label>
            <select value={city} onChange={(e)=>{setCity(e.target.value)}}>
                <option value="lahore">Lahore</option>
                <option value="islamabad">Islamabad</option>
                <option value="karachi">Karachi</option>
                <option value="peshawar">Peshawar</option>
                <option value="quetta">Quetta</option>
            </select>
            

            <div className="search">
                <input
                    type="text" 
                    placeholder="Search.." 
                    value={searchString} 
                    onChange={(e)=>{setSearchString(e.target.value)}}
                />
                
            </div>

            <div className="results">
                {doctorResults && doctorResults.map((res) => (
                    <Link to="/doctorPublic">
                        <div className="profileTile">
                        <div key={res.Account_ID}>
                            <p>{res.First_Name + " " + res.Last_Name + " " + res.Account_ID }</p>
                        </div>
                    </div>
                    </Link>
                ))}

                {hospitalResults && hospitalResults.map((res) => (
                    <Link to="/doctorPublic">
                        <div className="profileTile">
                        <div key={res.Account_ID}>
                            <p>{res.Name + " " + res.Address + " " + res.Account_ID }</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>    
            {userID? (<div>Loggin in as User {userID}</div>) : <Link to="/login">Login</Link>} 
            {userID? (<button onClick={handleLogout}>Logout</button>) : null}
        </div>  
     );
}
 
export default Home