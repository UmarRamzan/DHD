import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hospitalGetInfo } from "../API/api";

const HospitalPublic = () => {

    const [data, setData] = useState({})

    const location = useLocation()

    useEffect(() => {
        let hospitalID = location.state.hospitalID

        let data = hospitalGetInfo(hospitalID)
        data.then((res) => {console.log(data); setData(res.data)})
    }, [])

    return ( 
        <div className="hospitalPublic">
            <h1>{ data.name }</h1>
            <p>{ data.city }</p>
            <p>{ data.address }</p>
            <h3>Booking</h3>
        </div>
     );
}
 
export default HospitalPublic;