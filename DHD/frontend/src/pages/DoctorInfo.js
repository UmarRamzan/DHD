import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { doctorAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import { UserState } from "../UserState";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import {Input, Label} from 'reactstrap';

const DoctorInfo = () => {

    const userState = useContext(UserState)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('male')
    const [specialization, setSpecialization] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [personalBio, setPersonalBio] = useState('')
    const [onlineAvailability, setOnlineAvailability] = useState(false)
    const [hourlyCharge, setHourlyCharge] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [firstName, lastName, dateOfBirth, gender, specialization, city, address, startTime, endTime, personalBio, onlineAvailability, hourlyCharge])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'doctor')

        let accountID = accountRes.data.accountID

        if (accountRes.data.isSuccessful) {

            let online = onlineAvailability? 1 : 0

            let res = await doctorAddEntry(accountID, firstName, lastName, dateOfBirth, gender, specialization, city, address, startTime, endTime, personalBio, online, hourlyCharge)

            if (res.data.isSuccessful) {
                userState.setAccountID(accountID)
                userState.setAccountName(firstName)
                userState.setAccountType('doctor')

                userState["accountID"] = accountID
                userState["accountName"] = firstName
                userState["accountType"] = 'doctor'
                
                localStorage.setItem('userState', JSON.stringify(userState))

                navigate("/home")
                
            } else {
                removeAccount(accountID)
                setError(res.data.errorMessage)
            }
            
        } else {
            setError(accountRes.data.errorMessage)
        }
    }

    return ( 
        <div className="signup" style={{width:"400px", margin:"30px auto"}}>
            
            <h2>Personal Information</h2>

            <hr style={{width:"320px", margin:"20px auto"}}/>

            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="First Name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Control placeholder="Last Name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} xs={4}>
                        <Form.Label style={{margin:"5px 10px"}}>Date of Birth</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Input type="date" name="date" placeholder="date placeholder" value={dateOfBirth} onChange={(e)=>{setDateOfBirth(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Select value={gender} onChange={(e)=>{setGender(e.target.value)}} placeholder="Gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Specialization" value={specialization} onChange={(e)=>{setSpecialization(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="City" value={city} onChange={(e)=>{setCity(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Address" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row style={{marginTop:"5px"}}>      
                    <Form.Group as={Col} xs={4}>
                        <Form.Label style={{margin:"5px 10px"}}>Start Time</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Input type="time" name="time" value={startTime} onChange={(e)=>{setStartTime(e.target.value)}} placeholder="time placeholder" required/>
                    </Form.Group>
                </Row>

                <Row style={{marginTop:"5px", marginBottom:"15px"}}>      
                    <Form.Group as={Col} xs={4}>
                        <Form.Label style={{margin:"5px 10px"}}>End Time</Form.Label>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Input type="time" name="time" id="exampleTime" placeholder="time placeholder" value={endTime} onChange={(e)=>{setEndTime(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Input type="textarea" name="text" placeholder="Personal Bio" value={personalBio} onChange={(e)=>{setPersonalBio(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} xs={7}>
                        <Input type="number" name="number"placeholder="Hourly Charges" value={hourlyCharge} onChange={(e)=>{setHourlyCharge(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group as={Col} style={{marginTop: "5px"}}>
                        <Label check>
                            <Input type="checkbox" value={onlineAvailability} onChange={(e)=>{setOnlineAvailability(!onlineAvailability)}}/>{' '}
                            Available Online
                        </Label>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Button variant="outline-success" type="submit" style={{width:"320px", margin:"auto"}}>Submit</Button>
                </Row>

             </Form>
             {error && <Alert variant='danger'>{error}</Alert>}
        </div>
    )
}
 
export default DoctorInfo;