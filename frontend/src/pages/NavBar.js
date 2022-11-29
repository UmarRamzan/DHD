import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";

const Home = () => {

    const [accountID, setAccountID] = useState(0)
    
    useEffect(() => {
        setAccountID(localStorage.getItem('accountID'))
    }, [])

    const handleLogout = () => {
        localStorage.setItem('accountID', 0)
    }

    return ( 
        <div className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            <Link to="/patientSettings">Settings</Link>
            <p>{accountID && "[ID " + accountID + "]"}</p>
            <button onClick={handleLogout}>Log Out</button>
        </div>  
     );
}
 
export default Home;