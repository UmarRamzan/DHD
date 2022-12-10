import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRecord, patientGetInfo, removeReview, reviewAddEntry } from "../API/api";
import { useState } from "react";
import { UserState } from "../UserState";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const AddRecord = () => {
    const userState = useContext(UserState)
    const location = useLocation()
    const navigate = useNavigate()
    let {patientID} = location.state

    const [data, setData] = useState({})
    const [recordText,setRecord] = useState('')
    const [isPending,setPending] = useState(false)
    const [error,setError] = useState(null)
    const [edit,setEditMode] = useState(false)
    const [prevText,setText] = useState('')
    const [prevID,setReviewID] = useState(null)
    const [pagePending, setPagePending] = useState(false)
    
    useEffect(() => {
        setPagePending(true)
        let data = patientGetInfo(patientID)
        data.then((res) => {setData(res.data)})
        .finally(()=>setPagePending(false))
    }, [])

    useEffect(() => {
        let data = getRecord(patientID,-1)
        data.then((res) => {
            console.log(res)
            if (res.data.isSuccessful){
                setText(res.data.text)
                setReviewID(res.data.reviewID)
                setEditMode(true)
            }else{
                setEditMode(false)
            }
        })
    }, [])

    useEffect(()=>{
        setError('')
    }, [recordText])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPending(true)

        // if in edit mode
        if (edit){
            // remove prev record
            let res = await removeReview(prevID)
            if (res.data.isSuccessful){
                //if removed prev record then add new one
                let res = await reviewAddEntry(patientID,userState.accountID,-1,recordText)
                if (res.data.isSuccessful){
                    navigate("/bookings")
                }else{
                    setError(res.data.errorMessage)
                    console.log(res.data)
                }
            }
        // else add without removing
        }else{
            let res = await reviewAddEntry(patientID,userState.accountID,-1,recordText)
            if (res.data.isSuccessful){
                navigate("/bookings")
            }else{
                setError(res.data.errorMessage)
                console.log(res.data)
            }  
        }
        setPending(false)
    }

    return ( 

        <div className="patientInfo">
            {pagePending && <Spinner style={{marginTop:"15%"}} animation="grow" />}
            {!pagePending && <Card style={{ width: '400px', margin: "100px auto", textAlign: "left" }}>
            <Card.Header as="h4">Add Record</Card.Header>
            <Card.Body>
                
                <Card.Text><strong>Patient:</strong> {`${data.firstName} ${data.lastName}`}</Card.Text>
                {data.dateOfBirth && <Card.Text><strong>Date of Birth:</strong> {data.dateOfBirth.substring(0,10)}</Card.Text>}
                <Card.Text><b>Gender</b>: {data.gender}</Card.Text>
                {edit && <p><b>Previous Record:</b></p>}
                {edit && <p>{prevText}</p>}
                <Form.Control as="textarea" placeholder="New Record" rows={3} onChange={(e)=>{setRecord(e.target.value)}} />
                {!isPending && !edit && <Button style={{marginTop: "10px", width: "120px"}} onClick={handleSubmit} variant="outline-success">Add Record</Button>}
                {!isPending && edit && <Button style={{marginTop: "10px", width: "120px"}} onClick={handleSubmit} variant="outline-success">Edit Record</Button>}
                {isPending && <Button disabled style={{marginTop: "10px", width: "120px"}} onClick={handleSubmit} variant="outline-success"><Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    /></Button>}
            </Card.Body>
        </Card>}
             {error}
        </div>
    );
}
 
export default AddRecord;