import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doctorGetInfo, reviewAddEntry } from "../API/api";
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

    const [rating, setRating] = useState(null)
    const [review, setReview] = useState('')

    const [addingReview, setAddingReview] = useState(false)

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

    const addReview = async () => {
        let patientID = userState.accountID
        
        let res = await reviewAddEntry(patientID, doctorID, rating, review)
        if (res.data.isSuccessful) {
            setAddingReview(false)
            
        } else {
            setError(res.data.errorMessage)
        }
    }

    const addBooking = async () => {

        if (userState.accountID == null) {
            setError('Login to create a booking')
        } else if (bookingDate != '' && bookingTime != '') {
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

                    <Card style={{ width: '800px', margin: 'auto',textAlign: "left" }}>
                        <Card.Body>
                            <Row style={{ width: '700px', margin: 'auto',textAlign: "left" }}>
                                <Col>
                                    <Card.Title>Reviews</Card.Title>
                                </Col>
                                <Col xs={3}>
                                    {!addingReview && <Button variant="outline-success" onClick={()=>{setAddingReview(true)}}>Add Review</Button>}
                                </Col>
                            </Row>  
                            
                            { addingReview &&
                            <Card style={{ width: '700px', margin: '20px auto',textAlign: "left" }}>
                                <Card.Body>
                                    <Card.Title>Add Review</Card.Title>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Control type="number" placeholder="Rating / 10" onChange={(e)=>{setRating(e.target.value)}}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" placeholder="Review" rows={3} onChange={(e)=>{setReview(e.target.value)}} />
                                        </Form.Group>
                                        <Button style={{margin:"0px 5px"}} variant="outline-secondary" onClick={()=>{setAddingReview(false)}}>Cancel</Button>
                                        <Button style={{margin:"0px 5px"}} variant="outline-success" onClick={addReview}>Confirm</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                            }

                            <Card style={{ width: '700px', margin: '20px auto',textAlign: "left" }}>
                                <Card.Body>
                                    <Card.Title>Patient Name</Card.Title>
                                    <Card.Text>Rating</Card.Text>
                                    <Card.Text>Review</Card.Text>
                                    <Card.Text>Date</Card.Text>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={4}>
                    <Card style={{ width: '400px', margin:"50px 0px", textAlign: "left" }}>
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

            <Row>
                <Col xs={8}>
                    
                </Col>
            </Row>
        </div>
     );
}
 
export default DoctorPublic;