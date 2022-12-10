import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { UserState } from "../UserState";
import { useState } from "react";
import { getPatientName, getRecords } from "../API/api";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const ViewRecords = () => {

    const userState = useContext(UserState)
    const [records,setRecords] = useState([])
    const [pending, setPending] = useState(false)


    useEffect(() => {
        setPending(true)
        let data = getRecords(userState.accountID)
        data.then((res) => {
            if(res.data.isSuccessful){
                for (const record of res.data.records) {
                    getPatientName(record.patientID).then((result)=>{
                        record.patientName = result.data.firstName + ' ' + result.data.lastName
                        setRecords(res.data.records)
                    })
                }
            }
            setPending(false)
        })
    }, [])

    return ( 
        <div className="records" style={{margin:"30px auto"}}>
            <p className="display-6">Records</p>
            <hr style={{width:"350px", margin:"20px auto"}}/>
            {pending && <Spinner style={{marginTop:"100px"}} animation="grow" />}
            {!pending &&
            <div className="records">
            {records && records.map((res)=>(
                <div className="record">
                    <div key={res.reviewID}>
                    <Card style={{ width: '400px', margin: "auto" }}>
                    <Card.Body>
                        <Card.Title>{"Patient: " + res.patientName}</Card.Title>
                        <Card.Text>
                            <p>{"Record: " + res.reviewText + "    "}</p>
                        </Card.Text>
                        <Link to="/addRecord"state={{patientID: res.patientID}}>Edit</Link>
                    </Card.Body>
                    </Card>
                    </div>
                </div>
            ))}
            </div>
            }

            
            
        </div>

    );
}
 
export default ViewRecords;