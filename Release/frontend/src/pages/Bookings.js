import { useEffect, useState, useContext } from "react";
import { getBookings, cancelBooking, updateBooking, getDoctorName, getPatientName, validateBooking } from "../API/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from 'reactstrap';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const Bookings = () => {

    const userState = useContext(UserContext)
    const navigate = useNavigate()

    const [bookings, setBookings] = useState(null)

    const [rescheduling, setRescheduling] = useState(false)
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(null)

    const [selectedBookingID, setSelectedBookingID] = useState('')
    const [selectedDoctorID, setSelectedDoctorID] = useState('')
    const [selectedBookingDate, setSelectedBookingDate] = useState('')
    const [selectedBookingTime, setSelectedBookingTime] = useState('')

    const [reschedulePending, setReschedulePending] = useState(false)
    const [pending, setPending] = useState(false)

    useEffect(() => {
        setPending(true)
        let data = getBookings(userState.accountID, userState.accountType)

        data.then(async (res) => {

            if (res.data.isSuccessful) {
                await Promise.all(res.data.bookings.map(async (item)=>{
                    let patientRes = await getPatientName(item.patientID)
                    item.patientName = `${patientRes.data.firstName} ${patientRes.data.lastName}`
                    let doctorRes = await getDoctorName(item.doctorID)
                    item.doctorName = `${doctorRes.data.firstName} ${doctorRes.data.lastName}`
                }))
                console.log(res.data.bookings)
                setBookings(res.data.bookings)
                setPending(false)
            }
        })
    }, [])

    useEffect(() => {
        setError('')
    }, [selectedBookingDate, selectedBookingTime])

    const handleReschedule = async (bookingID) => {
        setReschedulePending(true)

        const today = new Date()
        const inpDate = new Date(selectedBookingDate)

        if (selectedBookingDate == '') {
            setError('Select a date')
        } else if (selectedBookingTime == ''){
            setError('Select a time')
        } else if (inpDate < today) {
            setError('Invalid date selected')
        } else {
            
            let validate = await validateBooking(selectedBookingDate, selectedBookingTime, selectedDoctorID)
            if (validate.data.isSuccessful) {
                
                let res = await updateBooking(bookingID, userState.accountID, selectedDoctorID, selectedBookingDate, selectedBookingTime)
                
                if (!res.data.isSuccessful) {
                    console.log(res.data.errorMessage)
                } else {
                    for (const item of bookings) {
                        if (item.bookingID == bookingID) {
                            item.date = selectedBookingDate
                            item.time = selectedBookingTime
                        }
                    }
                    setRescheduling(false)
                }
                
                } else {
                    setError(validate.data.errorMessage)
                }
            }
            setReschedulePending(false)
    }

    const handleCancel = (bookingID) => {
        setSelectedBookingID(bookingID)
        setDeleting(true)  
    }

    const handleDelete = () => {
        cancelBooking(selectedBookingID)
        setBookings(bookings.filter((item) => item.bookingID != selectedBookingID))
        setDeleting(false)  
    }

    const handleAddRecord = (patient_ID) =>{
        navigate("/addRecord",{state:{patientID:patient_ID}})
    }

    return ( 
        <div className="bookings" style={{margin:"30px auto"}}>
            <p className="display-6">{userState.accountType == 'doctor'? 'Appointments': 'Bookings'}</p>
            <hr style={{width:"350px", margin:"20px auto"}}/>
            {pending && <Spinner style={{marginTop:"10%"}} animation="grow" />}
            {bookings && bookings.map((res) => (
                
                    <div className="bookingTile" key={res.bookingID}>
                        <Card style={{ width: '800px', margin:"15px auto", textAlign:"left" }}>
                            <Card.Body>
                                <Card.Title>{userState.accountType == 'doctor'? 'Patient: ' + res.patientName : '' }</Card.Title>
                                <Card.Title>{userState.accountType == 'patient'? ' Doctor: ' + res.doctorName : ''}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{'Date: ' + res.date.substring(0,10) + ' Time: ' + res.time}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-muted">{res.online? 'Online' : 'In Person'}</Card.Subtitle>
                                
                                    <div className="editBooking">
                                        <Button variant="outline-secondary" onClick={()=>{setRescheduling(true); setSelectedBookingID(res.bookingID); setSelectedBookingDate(res.date); setSelectedBookingTime(res.time); setSelectedDoctorID(res.doctorID)}} style={{margin: "10px 2px"}}>Reschedule</Button>
                                        {userState.accountType === 'doctor' && <Button variant="outline-secondary"  onClick={() =>{handleAddRecord(res.patientID)}} style={{margin: "10px 2px"}}>Record</Button>}
                                        <Button variant="outline-danger" onClick={() =>{handleCancel(res.bookingID)}} style={{margin: "10px 2px"}}>Cancel</Button>
                                    </div>
                                </Card.Body>
                        </Card>

                    </div>
            ))}

            <Modal 
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={rescheduling}
            onHide={() => setRescheduling(false)}
            style={{width: "400px", margin: "0px 37%"}}
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Reschedule Booking
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <h6 style={{margin:"10px 0px 5px 0px"}}>Date</h6>
                    <Input type="date" name="date" placeholder="date placeholder" value={selectedBookingDate.substring(0,10)} onChange={(e)=>{setSelectedBookingDate(e.target.value)}}/>
                    <h6 style={{margin:"10px 0px 5px 0px"}}>Time</h6>
                    <Input type="time" name="time" placeholder="time placeholder" value={selectedBookingTime} onChange={(e)=>{setSelectedBookingTime(e.target.value)}}/>
                </Modal.Body>
                <Modal.Footer>
                <div className="editBooking">
                    <Button variant="outline-secondary" onClick={()=>{setRescheduling(false)}} style={{margin: "10px 2px"}}>Cancel</Button>
                    {!reschedulePending && <Button variant="outline-success" onClick={()=>{handleReschedule(selectedBookingID)}} style={{margin: "10px 2px", width: "90px"}}>Confirm</Button>}
                    {reschedulePending && <Button variant="outline-success" onClick={()=>{handleReschedule(selectedBookingID)}} style={{margin: "10px 2px", width: "90px"}}><Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    /></Button>}
                    
                </div>
                {error && <Alert style={{marginTop: "20px", width: "390px"}} variant='danger'>{error}</Alert>}
                </Modal.Footer>
                
            </Modal>

            <Modal show={deleting} onHide={()=>{setDeleting(false)}}>
                <Modal.Header closeButton>
                <Modal.Title>Cancel Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to cancel this booking</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setDeleting(false)}}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default Bookings;