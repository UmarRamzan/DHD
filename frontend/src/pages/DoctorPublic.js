import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doctorGetInfo } from "../API/api";
import { createBooking } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker'
import { UserState } from "../UserState";

import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const DoctorPublic = () => {

    const userState = useContext(UserState)

    const [data, setData] = useState({})
    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('')

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    let doctorID = location.state.doctorID

    useEffect(() => {
        setError('')
        setMessage('')
    }, [bookingDate, bookingTime])

    useEffect(() => {
        let data = doctorGetInfo(doctorID)
        data.then((res) => {setData(res.data)})
    }, [])

    const addBooking  = async () => {

        if (bookingDate != '' && bookingTime != '') {
            let res = await createBooking(userState.accountID, doctorID, bookingDate, bookingTime)

            if (res.data.isSuccessful) {
                setMessage("Booking has been created")
                
            } else {
                setError(res.data.errorMessage)
            }
        } else {
            setError("Choose date and time")
        }
    }

    return ( 
        <div className="doctorPublic">

            <Row>
                <Col xs={8}>
                    <Card style={{ width: '800px', margin:"50px auto", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>{ `${data.firstName} ${data.lastName}`}</Card.Title>
                            <p>{ data.specialization }</p>
                            <p>{ `${data.address} ${data.city}` }</p>
                            <p>{ data.timings }</p>
                            <p>{ data.personalBio }</p>
                            <p>{ data.onlineAvailability }</p>
                            <p>{ data.charges }</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '400px', margin:"50px auto", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>Booking</Card.Title>
                            <h6 style={{margin:"10px 0px 5px 0px"}}>Date</h6>
                            <Input type="date" name="date" placeholder="date placeholder" onChange={(e)=>{setBookingDate(e.target.value)}}/>
                            <h6 style={{margin:"10px 0px 5px 0px"}}>Time</h6>
                            <Input type="time" name="time" placeholder="time placeholder" onChange={(e)=>{setBookingTime(e.target.value)}}/>

                        <Form.Select style={{margin:"20px 0px"}}required>
                            <option value="online">Online</option>
                            <option value="inPerson">In Person</option>
                        </Form.Select>
                            <Button onClick={addBooking} style={{margin:"auto"}} variant="outline-success">Confirm Booking</Button>
                        <div className="messages" style={{margin:"10px 0px"}}>
                            {error && <Alert variant='danger'>{error}</Alert>}
                            {message && <Alert variant='success'>{message}</Alert>}
                        </div>
                            
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
     );
}
 
export default DoctorPublic;