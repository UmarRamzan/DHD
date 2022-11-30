import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useLocation, useNavigate } from "react-router-dom";

const Settings = () => {

    const {accountID, setAccountID, accountType, setAccountType} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        console.log(accountType)
        if (accountType == 'patient') {navigate('/patientSettings')}
    })

    return ( 
        <h1>Settings</h1>
    );
}
 
export default Settings;