import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../API/api";
import { UserContext } from "../UserContext";

const NavBar = () => {

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        setAccountID(localStorage.getItem("accountID"))
        setAccountType(localStorage.getItem("accountType"))
        setAccountName(localStorage.getItem("accountName"))
    }, [])


    const handleLogout = () => {
        setAccountID(null)
        setAccountType(null)
        setAccountName(null)
        
        localStorage.setItem('accountID', null)
        localStorage.setItem('accountType', null)
        localStorage.setItem('accountName', null)

        navigate('/home')
    }

    return ( 
        <div className="navbar">
            
            <Link to="/home">Home</Link>
            <Link to="/bookings" state={{message:"Login to access bookings"}}>Bookings</Link>
            <Link to="/settings" state={{message:"Login to access settings"}}>Settings</Link>
            {!accountID && <Link to="/signup">Signup</Link>}
            {!accountID && <Link to="/login">Login</Link>}

            <div className="logout">
                <p>{accountID && accountName}</p>
                {accountID && (<button onClick={handleLogout}>Log Out</button>)}
            </div>
            
        </div>  
     );
}
 
export default NavBar;