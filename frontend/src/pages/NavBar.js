import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";

const Home = () => {

    const handleLogout = () => {
        localStorage.setItem('accountID', 0)
    }

    return ( 
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/patientSettings">Settings</Link>
            <Link to="/bookings">Bookings</Link>
        </div>  
     );
}
 
export default Home;