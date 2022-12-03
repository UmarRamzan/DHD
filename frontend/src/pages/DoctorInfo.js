import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { doctorAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const DoctorInfo = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState('male')
    const [specialization, setSpecialization] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [timings, setTimings] = useState('')
    const [personalBio, setPersonalBio] = useState('')
    const [onlineAvailability, setOnlineAvailability] = useState(false)
    const [charges, setCharges] = useState('')

    const [error, setError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [firstName, lastName, dateOfBirth, gender, specialization, city, address, timings, personalBio, onlineAvailability, charges])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'doctor')

        let accountID = accountRes.data.accountID

        if (accountRes.data.isSuccessful) {

            let year = dateOfBirth.getFullYear()
            let month = dateOfBirth.getMonth()
            let day = dateOfBirth.getDay()

            let date = `${year}-${month}-${day}`
            let online = onlineAvailability? 1 : 0

            let res = await doctorAddEntry(accountID, firstName, lastName, date, gender, specialization, city, address, timings, personalBio, online, charges)

            if (res.data.isSuccessful) {
                localStorage.setItem('accountID', accountID)
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

            <hr style={{width:"350px", margin:"20px auto"}}/>

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
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Day" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Month" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Year" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Select onChange={(e)=>{setGender(e.target.value)}}>
                            <option>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Specialization" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="City" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Address" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Timings" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>   
                    <Form.Group as={Col}>
                        <Form.Check 
                        type="checkbox"
                        id="custom-switch"
                        label="Available Online"
                        />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Personal Bio" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Control placeholder="Charges" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} required/>
                    </Form.Group>
                </Row>

                

                <Row className="mb-3">
                    <Button variant="outline-dark" type="submit" style={{width:"310px", margin:"auto"}}>Submit</Button>
                </Row>

             </Form>
             {error && <Alert variant='danger'>{error}</Alert>}
        </div>
    )
}
 
export default DoctorInfo;