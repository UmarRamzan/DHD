import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";
import { UserContext } from "../UserContext";

const NavBar = () => {

    const {accountID, setAccountID} = useContext(UserContext)

    useEffect(() => {
        setAccountID(localStorage.getItem("accountID"))
    }, [])

    const handleLogout = () => {
        setAccountID(null)
        localStorage.setItem("accountID", null)
    }

    return ( 
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/patientSettings">Settings</Link>
            <Link to="/bookings">Bookings</Link>

            <div className="logout">
                <p>{accountID && `User ${accountID}`}</p>
                {accountID && (<button onClick={handleLogout}>Log Out</button>)}
            </div>
            
        </div>  
     );
}
 
export default NavBar;