import { useEffect, useState, useContext } from "react";
import { getBookings, cancelBooking, updateBooking, patientGetInfo, doctorGetInfo } from "../API/api";
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
    const [patientNames, setPatientNames] = useState({})
    const [doctorNames, setDoctorNames] = useState({})

    const [rescheduling, setRescheduling] = useState(false)
    const [deleting, setDeleting] = useState(false);

    const [selectedBookingID, setSelectedBookingID] = useState('')
    const [selectedDoctorID, setSelectedDoctorID] = useState('')
    const [selectedBookingDate, setSelectedBookingDate] = useState('')
    const [selectedBookingTime, setSelectedBookingTime] = useState('')

    useEffect(() => {

        let data = getBookings(userState.accountID, userState.accountType)

        data.then(async (res) => {

            if (res.data.isSuccessful) {

                await res.data.bookings.map(async (item)=>{
                    item.patientName = await patientName(item.patientID)
                    item.doctorName = await doctorName(item.doctorID)
                    setBookings(res.data.bookings)
                })   
            }
        })
    }, [])

    useEffect(() => {

        let data = getBookings(userState.accountID, userState.accountType)

        data.then(async (res) => {

            if (res.data.isSuccessful) {

                await res.data.bookings.map(async (item)=>{
                    item.patientName = await patientName(item.patientID)
                    item.doctorName = await doctorName(item.doctorID)
                    setBookings(res.data.bookings)
                })   
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
    
    const patientName = async (patientID) => {
        let res = await patientGetInfo(patientID)
        return (res.data.firstName)
    }

    const doctorName = async (doctorID) => {
        let res = await doctorGetInfo(doctorID)
        return (res.data.firstName)
    }

    return ( 
        <div className="bookings" style={{margin:"30px auto"}}>
            <p className="display-6">{userState.accountType == 'doctor'? 'Appointments': 'Bookings'}</p>
            <hr style={{width:"350px", margin:"20px auto"}}/>
            {bookings && bookings.map((res) => (
                
                    <div className="bookingTile" key={res.bookingID}>
                        <Card style={{ width: '800px', margin:"15px auto", textAlign:"left" }}>
                            <Card.Body>
                                <Card.Title>{'Patient: ' + res.patientName + (userState.accountType != 'doctor'? ' Doctor: ' + res.doctorName : '') }</Card.Title>
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
                    <Button variant="outline-success" onClick={()=>{handleReschedule(selectedBookingID)}} style={{margin: "10px 2px"}}>Confirm</Button>
                </div>
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