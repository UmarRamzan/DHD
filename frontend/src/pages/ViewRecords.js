import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../UserState";
import { useState } from "react";
import { getRecords } from "../API/api";

const ViewRecords = () => {

    const userState = useContext(UserState)
    const [records,setRecords] = useState([])


    useEffect(() => {
        console.log(userState.accountID)
        let data = getRecords(userState.accountID)
        data.then((res) => {
            if(res.data.isSuccessful){
            setRecords(res.data.records)
            console.log(res.data)
            }
        })
    }, [])

    return ( 
        <div className="records">
            <h1>Records</h1>
            {records && records.map((res)=>(
                <div className="record">
                    <div key={res.reviewID}>
                        <p>{"Patient: " + res.patientID + "  Doctor: " + res.doctorID}</p>
                        <p>{"Record: " + res.reviewText + "    "}<Link to="/addRecord"state={{patientID: res.patientID}}>Edit</Link></p>
                    </div>
                </div>
            ))}
        </div>

    );
}
 
export default ViewRecords;