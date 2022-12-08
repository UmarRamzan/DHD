import { useEffect, useState, useContext } from "react";
import { getBookings, cancelBooking, updateBooking } from "../API/api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input} from 'reactstrap';

const Bookings = () => {

    const userState = useContext(UserContext)
    const navigate = useNavigate()

    const [bookings, setBookings] = useState(null)

    const [rescheduling, setRescheduling] = useState(false)

    const [selectedBookingID, setSelectedBookingID] = useState('')
    const [selectedDoctorID, setSelectedDoctorID] = useState('')
    const [selectedBookingDate, setSelectedBookingDate] = useState('')
    const [selectedBookingTime, setSelectedBookingTime] = useState('')

    useEffect(() => {

        let data = getBookings(userState.accountID, userState.accountType)

        data.then((res) => {
            if (res.data.isSuccessful) {
                setBookings(res.data.bookings)
            }
        })
    }, [])

    useEffect(() => {

        let data = getBookings(userState.accountID, userState.accountType)

        data.then((res) => {
            if (res.data.isSuccessful) {
                setBookings(res.data.bookings)
            }
        })
    }, [rescheduling])

    const handleReschedule = async (bookingID) => {
        let res = await updateBooking(bookingID, userState.accountID, selectedDoctorID, selectedBookingDate, selectedBookingTime)
        
        if (!res.data.isSuccessful) {
            console.log(res.data.errorMessage)
        } else {
            setRescheduling(false)
        }
    }
    const handleCancel = (bookingID) => {
        cancelBooking(bookingID)
        setBookings(bookings.filter((item) => item.bookingID != bookingID))
    }

    const handleAddRecord = (patient_ID) =>{
        navigate("/addRecord",{state:{patientID:patient_ID}})
    }

    return ( 
        <div className="bookings" style={{margin:"30px auto"}}>
            <p className="display-6">Bookings</p>
            <hr style={{width:"350px", margin:"20px auto"}}/>
            {bookings && bookings.map((res) => (
                
                    <div className="bookingTile" key={res.bookingID}>
                        <Card style={{ width: '800px', margin:"15px auto", textAlign:"left" }}>
                            <Card.Body>
                                <Card.Title>{'Patient: ' + res.patientID + ' Doctor: ' + res.doctorID }</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{'Date: ' + res.date.substring(0,10) + ' Time: ' + res.time}</Card.Subtitle>
                                <Card.Text>
                               Address
                                </Card.Text>
                                
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
                    <Button variant="outline-success" onClick={()=>{handleReschedule(selectedBookingID)}} style={{margin: "10px 2px"}}>Confirm</Button>
                </div>
                </Modal.Footer>
            </Modal>
        </div>
     );
}
 
export default Bookings;