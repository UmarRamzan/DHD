import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { patientAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import "react-datepicker/dist/react-datepicker.css"
import { UserContext } from "../UserContext";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker"
import Alert from 'react-bootstrap/Alert';

const PatientInfo = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [gender, setGender] = useState('male')

    const [error, setError] = useState('')

    const {accountID, setAccountID, accountType, setAccountType, accountName, setAccountName} = useContext(UserContext)

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError('')
    }, [firstName, lastName, dateOfBirth, gender])

    const handleSubmit = async (e) => {

        e.preventDefault()
        let email = location.state.email
        let password = location.state.password

        let accountRes = await signup(email, password, 'patient')

        if (accountRes.data.isSuccessful) {
    
            let accountID = accountRes.data.accountID

            let year = dateOfBirth.getFullYear()
            let month = dateOfBirth.getMonth()
            let day = dateOfBirth.getDay()

            let date = `${year}-${month}-${day}`

            let res = await patientAddEntry(accountID, firstName, lastName, date, gender)

            if (res.data.isSuccessful) {
                setAccountID(accountID)
                setAccountName(firstName)
                setAccountType('patient')
                
                localStorage.setItem('accountID', accountID)
                localStorage.setItem('accountName', firstName)
                localStorage.setItem('accountType', 'patient')

                console.log(localStorage.getItem('accountName'))

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
        <div className="signup" style={{width:"310px", margin:"150px auto"}}>
            <h2>Personal Information</h2>

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
                    <Button variant="outline-dark" type="submit" style={{width:"310px", margin:"auto"}}>Submit</Button>
                </Row>

             </Form>
             {error && <Alert variant='danger'>{error}</Alert>}
        </div>
    )
}
 
export default PatientInfo;