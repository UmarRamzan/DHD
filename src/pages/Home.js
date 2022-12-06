import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";
import { UserContext } from "../UserContext";

const Home = () => {

    const [searchString, setSearchString] = useState('')
    const [city, setCity] = useState('lahore')
    const [doctorResults, setDoctorResults] = useState(null)
    const [hospitalResults, setHospitalResults] = useState(null)
    const [showDoctors, setShowDoctors] = useState(true)
    const [showHospitals, setShowHospitals] = useState(true)
    
    const handleSearch = async () => {
        if (searchString == '') {
            setHospitalResults('')
            setDoctorResults('')

        } else {
            let res = await search(searchString, city)
            setDoctorResults(res.data.doctorList)
            setHospitalResults(res.data.hospitalList)
        }
    }

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

            <span>Show Doctors</span>
            <input 
                    type="checkbox"
                    defaultChecked={true}
                    onChange={(e)=>{setShowDoctors(!showDoctors)}}
            />

            <span>Show Hospitals</span>
            <input 
                    type="checkbox"
                    defaultChecked={true}
                    onChange={(e)=>{setShowHospitals(!showHospitals)}}
            />

            <div className="results">
                {showDoctors && doctorResults && doctorResults.map((res) => (
                    <Link to="/doctorPublic" state={{doctorID: res.accountID}}>
                        <div className="profileTile">
                        <div key={res.accountID}>
                            <p>{res.firstName + " " + res.lastName + " " + res.specialization }</p>
                        </div>
                    </div>
                    </Link>
                ))}

                {showHospitals && hospitalResults && hospitalResults.map((res) => (
                    <Link to="/hospitalPublic" state={{hospitalID: res.accountID}}>
                        <div className="profileTile">
                        <div key={res.accountID}>
                            <p>{res.name + " " + res.address }</p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>    

        </div>  
     );
}
 
export default Home