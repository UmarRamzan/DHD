import { useEffect, useState, useContext } from "react";
import { getBookings } from "../API/api";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Bookings = () => {
    const [bookings, setBookings] = useState(null)

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

    useEffect(() => {

        let accountType = 'patient'
        let data = getBookings(accountID, accountType)
        data.then((res) => {
            if (res.data.isSuccessful) {
                setBookings(res.data.bookings)
            }
        })
    }, [])

    return ( 
        <div className="bookings" style={{margin:"30px auto"}}>
            <p className="display-6">Bookings</p>
            {bookings && bookings.map((res) => (
                
                    <div className="bookingTile" key={res.bookingID}>
                        <Card style={{ width: '800px', margin:"15px auto", textAlign:"left" }}>
                            <Card.Body>
                                <Card.Title>{'Patient: ' + res.patientID + ' Doctor: ' + res.doctorID }</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{'Date: ' + res.date.substring(0,10) + ' Time: ' + res.time}</Card.Subtitle>
                                <Card.Text>
                               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates eveniet praesentium suscipit totam ducimus autem ipsa aliquid, quisquam et, aperiam tenetur iste harum voluptate mollitia, deleniti sint dolor cupiditate explicabo.
                                </Card.Text>
                                <Button variant="outline-secondary">Reschedule</Button>{' '}
                                <Button variant="outline-danger">Cancel</Button>
                            </Card.Body>
                        </Card>

                    </div>
            ))}
        </div>
     );
}
 
export default Bookings;