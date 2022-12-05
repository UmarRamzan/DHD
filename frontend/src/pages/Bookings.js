import { useEffect, useState, useContext } from "react";
import { getBookings, cancelBooking } from "../API/api";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Bookings = () => {

    const userState = useContext(UserContext)

    const [bookings, setBookings] = useState(null)

    useEffect(() => {

        let data = getBookings(userState.accountID, userState.accountType)

        data.then((res) => {
            if (res.data.isSuccessful) {
                setBookings(res.data.bookings)
            }
        })
    }, [])

    const handleCancel = (bookingID) => {
        cancelBooking(bookingID)
        setBookings(bookings.filter((item) => item.bookingID != bookingID))
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
                                <Button variant="outline-secondary">Reschedule</Button>{' '}
                                <Button variant="outline-danger" onClick={() =>{handleCancel(res.bookingID)}}>Cancel</Button>
                            </Card.Body>
                        </Card>

                    </div>
            ))}
        </div>
     );
}
 
export default Bookings;