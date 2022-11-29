import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";
import { UserContext } from "../UserContext";

const NavBar = () => {

    const {accountID, setAccountID} = useContext(UserContext)

    const handleLogout = () => {
        setAccountID(null)
    }

    return ( 
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/patientSettings">Settings</Link>
            <Link to="/bookings">Bookings</Link>
            
            <p>{accountID && `User ${accountID}`}</p>
            {accountID && (<button onClick={handleLogout}>Log Out</button>)}
        </div>  
     );
}
 
export default NavBar;