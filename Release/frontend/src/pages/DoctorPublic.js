import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doctorGetInfo, getReviews, removeReview, reviewAddEntry, getPatientName, validateBooking } from "../API/api";
import { createBooking } from "../API/api";
import "react-datepicker/dist/react-datepicker.css"
import { UserState } from "../UserState";

import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { Input } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Spinner from 'react-bootstrap/Spinner';

const DoctorPublic = () => {

    const userState = useContext(UserState)

    const [data, setData] = useState({})
    const [reviewList, setReviewList] = useState([])

    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('')
    const [bookingOnline, setBookingOnline] = useState('0')

    const [rating, setRating] = useState(null)
    const [review, setReview] = useState('')

    const [addingReview, setAddingReview] = useState(false)
    const [pagePending, setPagePending] = useState(false)
    const [reviewPending, setReviewPending] = useState(false)
    const [removingPending, setRemovingPending] = useState(false)
    const [pending, setPending] = useState(false)

    const [message, setMessage] = useState('')
    const [reviewError, setReviewError] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    let doctorID = location.state.doctorID

    useEffect(() => {
        setPagePending(true)
        let data = doctorGetInfo(doctorID)
        let reviewData = getReviews(doctorID)
        
        Promise.all([data, reviewData]).then(async (values)=>{
            setData(values[0].data)
            setReviewList(values[1].data.reviews)
            setPagePending(false)
        })
    }, [])

    useEffect(() => {
        setError('')
        setMessage('')
    }, [bookingDate, bookingTime])

    useEffect(() => {
        setReviewError('')
    }, [rating])

    const addReview = async () => {

        if (!rating) {
            setReviewError("Enter a rating")
            return
        } else if (rating > 10 || rating < 0) {
            setReviewError("Enter a valid rating")
            return
        }

        setReviewPending(true)

        let patientID = userState.accountID

        let res = await reviewAddEntry(patientID, doctorID, rating, review)
        if (res.data.isSuccessful) {
            if (!reviewList) {setReviewList([{
                "reviewID": res.data.reviewID,
                "patientID": patientID,
                "doctorID": doctorID,
                "rating": rating,
                "reviewText": review
            }])} else {
                reviewList.push({
                    "reviewID": res.data.reviewID,
                    "patientID": patientID,
                    "doctorID": doctorID,
                    "rating": rating,
                    "reviewText": review
                })
            }
            
            setAddingReview(false)
            
        } else {
            setError(res.data.errorMessage)
        }
        setReviewPending(false)
    }

    const deleteReview = async (reviewID) => {
        setRemovingPending(true)
        let res = await removeReview(reviewID)
        if (!res.data.isSuccessful) {
            setError(res.data.errorMessage)
        } else {
            setReviewList(reviewList.filter(review => review.reviewID != reviewID))
        }
        setRemovingPending(false)
    }

    const addBooking = async () => {
        setPending(true)

        const today = new Date()
        const inpDate = new Date(bookingDate)

        if (userState.accountID == null) {
            setError('Login to create a booking')
        } else if (bookingDate == '') {
            setError('Select a date')
        } else if (bookingTime == ''){
            setError('Select a time')
        } else if (inpDate < today) {
            setError('Invalid date selected')
        } else if (bookingTime > data.endTime || bookingTime < data.startTime) {
            setError('Invalid time selected')
        } else {
            let validate = await validateBooking(bookingDate, bookingTime, doctorID)
            if (validate.data.isSuccessful) {
                let res = await createBooking(userState.accountID, doctorID, bookingDate, bookingTime, bookingOnline)

                if (res.data.isSuccessful) {
                    setMessage("Booking has been created")
                    
                } else {
                    setError(res.data.errorMessage)
                }
            } else {
                setError(validate.data.errorMessage)
            }
        }
        setPending(false)
    }

    return ( 
        <div className="doctorPublic">
            {pagePending && <Spinner style={{marginTop: "20%"}} animation="grow" />}
            {!pagePending && <div className="pageContent">
            <Row>
                <Col xs={8}>
                    <Card style={{ width: '800px', margin:"50px auto", textAlign: "left" }}>
                        <Card.Header as="h2">{`${data.firstName} ${data.lastName}`}</Card.Header>
                    
                        <Card.Body>
                            <p>{ data.specialization }</p>
                            <p>{ `${data.address} ${data.city}` }</p>
                            <p>{ data.timings }</p>
                            <p>{ data.personalBio }</p>
                            <p>{ data.onlineAvailability? "Available Online" : "Not Available Online"}</p>
                            <p>{ data.hourlyCharges }/Hour</p>
                            <p>Available from {data.startTime} to {data.endTime}</p>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '800px', margin: 'auto',textAlign: "left" }}>
                        <Card.Header as="h5">
                        <Row style={{ width: '700px', margin: 'auto',textAlign: "left" }}>
                                <Col>
                                    <Card.Title as="h5" style={{marginTop:"10px"}}>Reviews</Card.Title>
                                </Col>
                                <Col xs={3}>
                                    {userState.accountType!='patient' &&
                                        <OverlayTrigger key="top" placement="bottom"
                                        overlay={
                                        <Tooltip id={`tooltip`}> Only <strong>{"patients"}</strong> can add reviews</Tooltip>
                                        }
                                        >
                                        <span className="d-inline-block">
                                            {!addingReview && <Button disabled style={{marginTop:"3px"}} variant="outline-success" onClick={()=>{setAddingReview(true)}}>Add Review</Button>}
                                        </span>
                                        </OverlayTrigger>
                                    }

                                    {userState.accountType=='patient' && 
                                    !addingReview && <Button style={{marginTop:"3px"}} variant="outline-success" onClick={()=>{setAddingReview(true)}}>Add Review</Button>}
                                
                                </Col>
                            </Row>  
                        </Card.Header>
                        <Card.Body>
                            
                            
                            { addingReview &&
                            <Card style={{ width: '700px', margin: '20px auto',textAlign: "left" }}>
                                <Card.Header as="h5">Add Review</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Control required type="number" placeholder="Rating / 10" onChange={(e)=>{setRating(e.target.value)}}/>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Control as="textarea" placeholder="Review" rows={3} onChange={(e)=>{setReview(e.target.value)}} />
                                        </Form.Group>
                                        <Button style={{margin:"0px 5px"}} variant="outline-secondary" onClick={()=>{setAddingReview(false)}}>Cancel</Button>
                                        {!reviewPending && <Button style={{margin:"0px 5px", width: "90px"}} variant="outline-success" onClick={addReview}>Confirm</Button>}
                                        {reviewPending && <Button disabled={true} style={{margin:"0px 5px", width: "90px"}} variant="outline-success" onClick={addReview}><Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        /></Button>}
                                        {reviewError && <Alert style={{marginTop: "20px"}} variant='danger'>{reviewError}</Alert>}
                                    </Form>
                                </Card.Body>
                            </Card>
                            }

                            {reviewList && reviewList.map((review)=> (
                                review.rating != -1 &&
                                <Card style={{ width: '700px', margin: '20px auto',textAlign: "left" }} key={review.reviewID}>
                                <Card.Body>
                                    <Card.Text>{`${review.rating}/10`}</Card.Text>
                                    <Card.Text>{review.reviewText}</Card.Text>
                                    <Card.Text><em>{review.date}</em></Card.Text>
                                    {review.patientID == userState.accountID && 
                                    <div>
                                        {!removingPending && <Button variant="outline-danger" style={{width: "90px"}} onClick={()=>{deleteReview(review.reviewID)}}>Remove</Button>}
                                        {removingPending && <Button variant="outline-danger" style={{width: "90px"}} onClick={()=>{deleteReview(review.reviewID)}}><Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        /></Button>}
                                    </div>
                                    
                                    }
                                </Card.Body>
                            </Card>
                                
                            ))}
                            
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={4}>
                    <Card style={{ width: '400px', margin:"50px 0px", textAlign: "left" }}>
                        <Card.Header as="h5">Booking</Card.Header>
                        <Card.Body>
                            
                            <h6 style={{margin:"10px 0px 5px 0px"}}>Date</h6>
                            <Input type="date" name="date" placeholder="date placeholder" onChange={(e)=>{setBookingDate(e.target.value)}}/>
                            <h6 style={{margin:"10px 0px 5px 0px"}}>Time</h6>
                            <Input type="time" name="time" placeholder="time placeholder" onChange={(e)=>{setBookingTime(e.target.value)}}/>

                        <Form.Select value={bookingOnline} onChange={(e)=>{setBookingOnline(e.target.value)}} style={{margin:"20px 0px"}}required>
                            <option value="0">In Person</option>
                            {data.onlineAvailability && <option value="1">Online</option>}
                        </Form.Select>

                            {userState.accountType !='patient' &&
                            <OverlayTrigger key="top" placement="bottom"
                            overlay={
                                <Tooltip id={`tooltip`}> Only <strong>{"patients"}</strong> can create bookings.</Tooltip>
                            }
                            >
                            <span className="d-inline-block">
                            <Button disabled={true} onClick={addBooking} style={{margin:"auto"}} variant="outline-success">Confirm Booking</Button>
                            
                            </span>
                            </OverlayTrigger>}
                            {userState.accountType=='patient' &&
                            <div className="patientButtons">
                            {!pending && <Button disabled={userState.accountType=='patient'?false:true} onClick={addBooking} style={{margin:"auto", width: "200px"}} variant="outline-success">Confirm Booking</Button>}
                            {pending && <Button disabled={true} onClick={addBooking} style={{margin:"auto", width: "200px"}} variant="outline-success"><Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /></Button>}
                            </div>
                            }

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
            </div>}
        </div>
     );
}
 
export default DoctorPublic;