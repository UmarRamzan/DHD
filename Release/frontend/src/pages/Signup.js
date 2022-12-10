import { useRef, useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { validateEmail } from "../API/api";

import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';


const Signup = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accountType, setAccountType] = useState('patient')
    const [error, setError] = useState('')

    const [pending, setPending] = useState(false)

    useEffect(() => {
        setError('')
    }, [email, password, accountType])

    const handleSubmit = async (e) => {
        setPending(true)
        e.preventDefault()

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Incorrect Email')
        } else if (password.length <= 8) {
            setError('Password must be atleast 8 characters')
        } else {
            let res = await validateEmail(email)
            if (res.data.isSuccessful) {
                navigate(`/signup/${accountType}`, { state: { email: email, password: password } })
            } else {
                setError(res.data.errorMessage)
            }
        }
        setPending(false)
    }

    return (
        
        <div className="form" style={{width:"400px", margin:"150px auto"}}>
            <Container>
                <Form onSubmit={handleSubmit}>

                    <p className="display-6">Sign-Up</p>

                    <hr style={{width:"350px", margin:"20px auto"}}/>

                    <Stack gap={1} className="col-12 mx-auto">

                    <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </Form.Group>
                
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </Form.Group>

                    <Form.Select onChange={(e)=>{setAccountType(e.target.value)}}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="hospital">Hospital</option>
                    </Form.Select>

                    {!pending && <Button variant="outline-dark" type="submit" className="my-2">Next</Button>}
                    {pending && <Button variant="outline-dark" type="submit" className="my-2"><Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    /></Button>}

                    {error && <Alert variant='danger'>{error}</Alert>}

                    </Stack>

                </Form>    
            </Container>
        </div>
    )
}
 
export default Signup;