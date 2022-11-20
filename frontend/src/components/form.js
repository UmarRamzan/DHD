//import './form.css';
import { useState, useEffect } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { LogIn } from "../../../API/api.js";

const initialState = {
   
    email: "",
    pw: "",
    
  };

export function form_login() {
    let navigator = useNavigate()

    const [new_account, set_account] = useState("")
    //useEffect?

    return (
        <Container>
            <Form>
                
            </Form>
        </Container>
    )
    return (
       
        <Container >
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name = 'email'
                value = {newEmploye.email} onChange = {handle}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                    
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name = 'pw' 
                    value = {newEmploye.pw} onChange = {handle}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick = {onLogin} disabled = {false}>
                            Login
             </Button>


        </Form> 
    </Container>
      
    )


}
export function FormLogin()
{
    let navigate = useNavigate();
    const [newEmploye, setNewEmploye] = useState(initialState);
    useEffect(() => {}, [newEmploye]);

    const handle = e => {
        e.preventDefault();
        const {name, value} = e.target;
        setNewEmploye({...newEmploye, [name]: value});
      
    }
    
    const onLogin = (e) =>{
        e.preventDefault();
        LogIn(newEmploye.email,newEmploye.pw ).then( (response) =>
        {
            
            console.log(response.data.isSuccessful);
            if(response.data.isSuccessful)
            {
                console.log(response.data.message);                
                localStorage.setItem('dumplingUserId',response.data.Id);
                localStorage.setItem('empRole',response.data.role);
                alert(response.data.message);
                console.log(localStorage.getItem('dumplingUserId'));

                const prams = {"role":response.data.role};
                navigate({pathname:'/dashboard',
                search: `?${createSearchParams(prams)}`});
            }
            else
            {
                alert(response.data.message);
                console.log(response.data.message);
            }
        });

        

    }
    
    
    // diable submit button if the pw and email dont match from api call
    
    return (
       
        <Container >
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" name = 'email'
                value = {newEmploye.email} onChange = {handle}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                    
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name = 'pw' 
                    value = {newEmploye.pw} onChange = {handle}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick = {onLogin} disabled = {false}>
                            Login
             </Button>


        </Form> 
    </Container>
      
    )
}