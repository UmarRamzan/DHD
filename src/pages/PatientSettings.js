import { useEffect, useState } from "react";
import { patientGetInfo } from "../API/api";

const PatientSettings = () => {
    const [userData, setUserData] = useState({})

    let userID = localStorage.getItem("userID")
    
    useEffect(() => {
        let data = patientGetInfo(userID)
        data.then((res) => setUserData(res.data))
    }, [])

    return ( 
        <div className="settings">
            <h1>Settings</h1>
            <p>{userData.First_Name}</p>
        </div>
     );
}
 
export default PatientSettings