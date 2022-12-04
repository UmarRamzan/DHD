import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signup } from "../API/api";
import { patientAddEntry } from "../API/api";
import { removeAccount } from "../API/api";
import "react-datepicker/dist/react-datepicker.css"
import { UserContext } from "../UserContext";
import { UserState } from "../UserState";


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FormGroup, Label, Input} from 'reactstrap';

const PatientInfo = () => {

    const userState = useContext(UserState)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('male')

    const [error, setError] = useState('')

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

            let res = await patientAddEntry(accountID, firstName, lastName, dateOfBirth, gender)

            if (res.data.isSuccessful) {
                userState.setAccountID(accountID)
                userState.setAccountName(firstName)
                userState.setAccountType('patient')

                userState["accountID"] = accountID
                userState["accountName"] = firstName
                userState["accountType"] = 'patient'
                
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
        <div className="signup" style={{width:"380px", margin:"150px auto"}}>
            <h2>Personal Information</h2>

            <hr style={{width:"350px", margin:"20px auto"}}/>

            <Form onSubmit={handleSubmit} style={{textAlign:"left"}}>

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
                        <Form.Select onChange={(e)=>{setGender(e.target.value)}} required>
                            <option>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </Form.Select>
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
 
export default PatientInfo;