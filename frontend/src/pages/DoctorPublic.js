import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doctorGetInfo } from "../API/api";
import { createBooking } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker'
import { UserState } from "../UserState";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import { FormGroup, Label, Input} from 'reactstrap';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

            <Row>
                <Col xs={8}>
                    <Card style={{ width: '800px', margin:"50px auto", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>{ `${data.firstName} ${data.lastName}`}</Card.Title>
                            <p>{ data.specialization }</p>
                            <p>{ `${data.address} ${data.city}` }</p>
                            <p>{ data.timings }</p>
                            <p>{ data.personalBio }</p>
                            <p>{ data.onlineAvailability }</p>
                            <p>{ data.charges }</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '400px', margin:"50px auto", textAlign: "left" }}>
                        <Card.Body>
                            <Card.Title>Booking</Card.Title>
                            <h6 style={{margin:"10px 0px 5px 0px"}}>Date</h6>
                            <Input type="date" name="date" placeholder="date placeholder" onChange={(e)=>{setBookingDate(e.target.value)}} required/>
                            <h6 style={{margin:"10px 0px 5px 0px"}}>Time</h6>
                            <Input type="time" name="date" placeholder="date placeholder" onChange={(e)=>{setBookingDate(e.target.value)}} required/>

                        <Form.Select style={{margin:"20px 0px"}}required>
                            <option value="online">Online</option>
                            <option value="inPerson">In Person</option>
                        </Form.Select>

                            <Button style={{margin:"auto"}} variant="outline-success">Confirm Booking</Button>
                        </Card.Body>
                    </Card>
                    <p>{ error }</p>
                </Col>
            </Row>
        </div>
     );
}
 
export default DoctorPublic;