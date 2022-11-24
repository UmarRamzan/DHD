import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../API/api";

const Home = () => {
    const [searchString, setSearchString] = useState('')

    const handleSearch = () => {
        console.log("Searching", searchString)
        search(searchString)
        .then((res) => {
            console.log(res)
        })
    }

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
        </div>  
     );
}
 
export default Home;