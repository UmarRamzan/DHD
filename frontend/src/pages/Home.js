import { useState } from "react";
import { search } from "../API/api";
import { useEffect } from "react";

const Home = () => {
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
        </div>  
     );
}
 
export default Home