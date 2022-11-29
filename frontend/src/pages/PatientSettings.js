import { useEffect, useState } from "react";
import { patient_get_info } from "../API/api";

const PatientSettings = () => {
    const [userData, setUserData] = useState({})

    let userID = localStorage.getItem("userID")
    
    useEffect(() => {
        let data = patient_get_info(userID)
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