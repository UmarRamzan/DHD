import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { doctorGetInfo } from "../API/api";
import { createBooking } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker'

const DoctorPublic = () => {

    const [data, setData] = useState({})
    const [bookingDate, setBookingDate] = useState(new Date())
    const [bookingTime, setBookingTime] = useState(new Date())

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    let patientID = localStorage.getItem("accountID")
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

        let res = await createBooking(patientID, doctorID, date, bookingTime)

        if (res.data.isSuccessful) {
            navigate("/home")
            
        } else {
            setError(res.data.errorMessage)
        }
    }

    return ( 
        <div className="doctorPublic">
            <h1>{ data.firstName + ' ' + data.lastName}</h1>
            <p>{ data.specialization }</p>
            <p>{ data.city }</p>
            <p>{ data.address }</p>
            <p>{ data.timings }</p>
            <p>{ data.personalBio }</p>
            <p>{ data.onlineAvailability }</p>
            <p>{ data.charges }</p>
            <Link to="/reviews" state={{doctorID: doctorID}}>Reviews</Link>
            <h3>Booking</h3>
            <DatePicker onChange={(date) => {setBookingDate(date)}} selected={bookingDate}/>
            <TimePicker onChange={(time) => {setBookingTime(time)}} selected={bookingTime} disableClock={true}/>
            <button onClick={addBooking}>Book</button>
            <p>{ error }</p>
        </div>
     );
}
 
export default DoctorPublic;