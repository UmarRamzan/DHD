import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { hospitalGetInfo, doctorHospitalAddEntry, getDepartments, getDoctorHospital } from "../API/api";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';

import { UserState } from "../UserState";

const HospitalPublic = () => {

    const userState = useContext(UserState)
    const location = useLocation()

    const [data, setData] = useState({})
    const [hospitalID, setHospitalID] = useState('')
    const [department, setDepartment] = useState('')

    const [departmentList, setDepartmentList] = useState([])
    const [doctorDict, setDoctorDict] = useState({})
    
    const [addingHospital, setAddingHospital] = useState(false)

    useEffect(() => {
        if (location.state) {
            setHospitalID(location.state.hospitalID)
            if (location.state.hospitalID) {
                localStorage.setItem('hospitalID', location.state.hospitalID)
                let data = hospitalGetInfo(location.state.hospitalID)
                data.then((res) => {setData(res.data)})
                let departments = getDepartments(location.state.hospitalID)
                departments.then((res)=>{setDepartmentList(res.data.departments)})
                let departmentData = getDoctorHospital(location.state.hospitalID)
                departmentData.then((res)=>{
                    setDoctorDict({})
                    res.data.data.map((item)=>{
                        if (doctorDict[item.department]) {
                            doctorDict[item.department].push(item.doctorID)
                        } else {
                            doctorDict[item.department] = [item.doctorID]
                        }
                    })
                })
                setDoctorDict(doctorDict) 
                console.log(doctorDict)
                for (var key in doctorDict) {
                    console.log(key)
                }
            }
        }
        setHospitalID(localStorage.getItem('hospitalID'))
    }, [])

    const addHospital = async () => {
        let res = await doctorHospitalAddEntry(userState.accountID, hospitalID, department)
        setAddingHospital(false)
    }

    return ( 
        <div className="hospitalPublic">
            <Row style={{marginTop: "50px"}}>
                <Col >
                <Card style={{ width: '800px', margin:"50px auto", textAlign: "left" }}>
                    <Card.Header as="h2">{`${data.name}`}</Card.Header>
                
                    <Card.Body>
                        <p>{ data.specialization }</p>
                        <p>{ `${data.address} ${data.city}` }</p>
                    </Card.Body>
                </Card>
                </Col>

                <Col xs={5} style={{margin: "0px 10px"}}>
                    <h3>Departements</h3>

                    <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                    <Row>
                        <Col sm={4}>
                        <ListGroup>
                            {departmentList && departmentList.map((item, idx)=>(
                                <ListGroup.Item action href={"#link" + idx}>
                                {item.department}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        </Col>
                        <Col sm={8}>
                        
                        <Tab.Content>
                            
                            <Tab.Pane eventKey="#link1">
                            Text
                            </Tab.Pane>
                            <Tab.Pane eventKey="#link2">
                            Text
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                    
                    <Button variant="outline-success" onClick={()=>{setAddingHospital(true)}}>Add</Button>
                    

                    { addingHospital &&
                    <Card style={{ width: '300px', margin: '20px auto',textAlign: "left" }}>
                        
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="input" placeholder="Department" rows={3} onChange={(e)=>{setDepartment(e.target.value)}} />
                                </Form.Group>
                                <Button style={{margin:"0px 5px"}} variant="outline-secondary" onClick={()=>{setAddingHospital(false)}}>Cancel</Button>
                                <Button style={{margin:"0px 5px"}} variant="outline-success" onClick={addHospital}>Confirm</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    }
                </Col>
            </Row>

        </div>
     );
}
 
export default HospitalPublic;