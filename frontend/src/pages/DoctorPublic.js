import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doctorGetInfo } from "../API/api";
import { createBooking } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker'
import { UserState } from "../UserState";

const DoctorPublic = () => {

    const userState = useContext(UserState)

    const [data, setData] = useState({})
    const [bookingDate, setBookingDate] = useState(new Date())
    const [bookingTime, setBookingTime] = useState(new Date())

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    let doctorID = location.state.doctorID

    useEffect(() => {
        setError('')
    }, [bookingDate, bookingTime])

    useEffect(() => {
        let data = doctorGetInfo(doctorID)
        data.then((res) => {setData(res.data)})
    }, [])

    const addBooking  = async () => {

        let year = bookingDate.getFullYear()
        let month = bookingDate.getMonth()
        let day = bookingDate.getDay()
        let date = `${year}-${month}-${day}`

        let res = await createBooking(userState.accountID, doctorID, date, bookingTime)

        if (res.data.isSuccessful) {
            navigate("/home")
            
        } else {
            setError(res.data.errorMessage)
        }
    }

    return ( 
        <div className="doctorPublic">
            <div className="name" style={{margin: "100px 150px", textAlign: "left"}}>
                <h1>{ `${data.firstName} ${data.lastName}`}</h1>
                <hr style={{width:"350px", margin:"20px auto"}}/>
            </div>

            <p>{ data.specialization }</p>
            <p>{ data.city }</p>
            <p>{ data.address }</p>
            <p>{ data.timings }</p>
            <p>{ data.personalBio }</p>
            <p>{ data.onlineAvailability }</p>
            <p>{ data.charges }</p>
            <h3>Booking</h3>
            <DatePicker onChange={(date) => {setBookingDate(date)}} selected={bookingDate}/>
            <TimePicker onChange={(time) => {setBookingTime(time)}} selected={bookingTime} disableClock={true}/>
            <button onClick={addBooking}>Book</button>
            <p>{ error }</p>
        </div>
     );
}
 
export default DoctorPublic;