import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../API/api";
import { UserContext } from "../UserContext";

const Home = () => {

    const {userID, setUserID} = useContext(UserContext)

    const [searchString, setSearchString] = useState('')
    const [results, setResults] = useState(null)

    const handleSearch = async () => {
        if (searchString == '') {
            setResults('')
        } else {
            let res = await search(searchString, 'Lahore')
            setResults(res.data.hospital_list)
        }
    }

    const handleLogout = () => {
        localStorage.clear()
        setUserID(null)
    }

    setUserID(localStorage.getItem("userID"))

    useEffect(() => {
        handleSearch()
    }, [searchString])

    return ( 
        <div className="home">
            
            <h1>Home</h1>

            <div className="search">
                <input
                    type="text" 
                    placeholder="Search.." 
                    value={searchString} 
                    onChange={(e)=>{setSearchString(e.target.value)}}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="results">
                {results && results.map((res) => (
                    <div key={res.Account_ID}>
                        <p>{res.Name + " " + res.Address}</p>
                    </div>
                ))}
            </div>    
            {userID? (<div>Loggin in as User {userID}</div>) : <Link to="/login">Login</Link>} 
            {userID? (<button onClick={handleLogout}>Logout</button>) : null}
        </div>  
     );
}
 
export default Home