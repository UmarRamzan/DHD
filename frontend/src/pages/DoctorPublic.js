import { useEffect, useState } from "react";
import { doctor_get_info } from "../API/api";

const DoctorPublic = () => {

    const [data, setData] = useState({})

    useEffect(() => {
        let data = doctor_get_info(1)
        data.then((res) => {setData(res.data)})
    }, [])

    return ( 
        <div className="doctorPublic">
            <h1>Doctor Public</h1>
            <p>{ data.firstName }</p>
            <p>{ data.lastName }</p>
            <p>{ data.specialization }</p>
            <p>{ data.city }</p>
            <p>{ data.address }</p>
            <p>{ data.timings }</p>
            <p>{ data.personalBio }</p>
            <p>{ data.onlineAvailability }</p>
            <p>{ data.charges }</p>
        </div>
     );
}
 
export default DoctorPublic;