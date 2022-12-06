import { useEffect, useState, useContext } from "react";
import { getBookings } from "../API/api";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

const Bookings = () => {
    const [bookings, setBookings] = useState(null)

    const {accountID, setAccountID} = useContext(UserContext)

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
        <div className="bookings">
            <p>Bookings</p>
            {bookings && bookings.map((res) => (
                <Link>
                    <div className="bookingTile">
                        <div key={res.bookingID}>
                            <p>{'Patient: ' + res.patientID + ' Doctor: ' + res.doctorID }</p>
                            <p>{'Date: ' + res.date.substring(0,10) + ' Time: ' + res.time}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
     );
}
 
export default Bookings;