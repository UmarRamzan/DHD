import { useContext, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../UserState";

const Profile = () => {

    const userState = useContext(UserState);
    const navigate = useNavigate()

    let accountType = userState.accountType

    useEffect(()=> {
        if (accountType == 'hospital') {navigate('/hospitalPublic', {state: {hospitalID: userState.accountID}})}
        else if (accountType == 'doctor') {navigate('/doctorPublic', {state: {doctorID: userState.accountID}})}

    })
  
    return ( 
        <h1>Settings</h1>
    );
}
 
export default Profile;