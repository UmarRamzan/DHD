import { useEffect, useState } from "react";
import { patientGetInfo } from "../API/api";

const PatientSettings = () => {
    const [userData, setUserData] = useState({})
    
    useEffect(() => {
        let accountID = localStorage.getItem("accountID")
        let data = patientGetInfo(accountID)
        data.then((res) => {console.log(res); setUserData(res.data)})
    }, [])

    return ( 
        <div className="settings">
            <h1>Patient Settings</h1>
            <h3>Personal Information</h3>
            <p>{"First Name: " + userData.firstName}</p>
            <p>{"Last Name: " + userData.lastName}</p>
            <p>{"Date of Birth: " + userData.dateOfBirth.substring(0,10)}</p>
            <p>{"Gender: " + userData.gender}</p>
        </div>
     );
}
 
export default PatientSettings