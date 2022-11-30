import { useEffect, useState } from "react";
import { accountGetInfo, patientGetInfo } from "../API/api";

const PatientSettings = () => {
    const [userData, setUserData] = useState({})
    const [accountData, setAccountData] = useState({})
    
    useEffect(() => {
        let accountID = localStorage.getItem("accountID")
        let patientData = patientGetInfo(accountID)
        let accountData = accountGetInfo(accountID)

        patientData.then((res) => {setUserData(res.data)})
        accountData.then((res) => {setAccountData(res.data)})

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
                    <button onClick={handleEdit}>Edit Personal Information</button>

                    <h3>Account Information</h3>
                    <p>{"Email: " + accountData.email}</p>
                    <p>{"Account Type: " + accountData.accountType}</p>
                    <button onClick={handleEdit}>Edit Account Information</button><br/><br/>
                    <button>Change Password</button>
                </div>   
            }
            <br/>
            <button>Delete Account</button>
        </div>
     );
}
 
export default PatientSettings