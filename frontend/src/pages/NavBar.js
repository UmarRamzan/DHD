import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";

const Home = () => {

    return ( 
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/patientSettings">Settings</Link>
        </div>  
     );
}
 
export default Home;