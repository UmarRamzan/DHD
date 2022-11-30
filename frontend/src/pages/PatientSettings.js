import { useEffect, useState } from "react";
import { patientGetInfo } from "../API/api";

const PatientSettings = () => {
    const [userData, setUserData] = useState({})
    
    useEffect(() => {
        let accountID = localStorage.getItem("accountID")
        let data = patientGetInfo(accountID)
        data.then((res) => {setUserData(res.data)})
    }, [])

    const handleEdit = () => {
        console.log("edit")
    }

    return ( 
        <div className="settings">
            {
                userData && 
                <div className="data">
                    <h1>Patient Settings</h1>
                    <h3>Personal Information</h3>
                    <p>{"First Name: " + userData.firstName}</p>
                    <p>{"Last Name: " + userData.lastName}</p>
                    <p>{userData.dateOfBirth && "Date of Birth: " + userData.dateOfBirth.substring(0,10)}</p>
                    <p>{"Gender: " + userData.gender}</p>
                    <button onClick={handleEdit}>Edit Information</button>
                </div>   
            }
        </div>
     );
}
 
export default PatientSettings