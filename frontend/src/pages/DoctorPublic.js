import { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { doctorGetInfo } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker'

const DoctorPublic = () => {

    const [data, setData] = useState({})
    const [bookingDate, setBookingDate] = useState(new Date())
    const [bookingTime, setBookingTime] = useState(new Date())

    const location = useLocation()

    useEffect(() => {
        let doctorID = location.state.doctorID
        let data = doctorGetInfo(doctorID)
        data.then((res) => {setData(res.data)})
    }, [])

    return ( 
        <div className="doctorPublic">
            <h1>{ data.firstName + ' ' + data.lastName }</h1>
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
            <button >Confirm</button>
        </div>
     );
}
 
export default DoctorPublic;