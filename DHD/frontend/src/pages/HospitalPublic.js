import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { hospitalGetInfo, doctorHospitalAddEntry, getDepartments, getDoctorHospital, doctorGetInfo } from "../API/api";

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { UserState } from "../UserState";

const HospitalPublic = () => {

    const userState = useContext(UserState)
    const location = useLocation()

    const [data, setData] = useState({})
    const [hospitalID, setHospitalID] = useState('')
    const [department, setDepartment] = useState('')

    const [departmentList, setDepartmentList] = useState({})
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
                departments.then((res)=>{
                    res.data.departments.forEach((item) => {
                        departmentList[item.department] = []
                    })
                })
                console.log("List" , departmentList)

                let departmentData = getDoctorHospital(location.state.hospitalID)
                departmentData.then((res)=>{
                    res.data.data.map(async (item)=>{
                        if (departmentList[item.department]) {
                            departmentList[item.department].push([item.doctorID, await doctorName(item.doctorID)])
                        } else {
                            departmentList[item.department] = [[item.doctorID, await doctorName(item.doctorID)]]
                        }
                    })
                })

                console.log(departmentList)
            }
        }
        setHospitalID(localStorage.getItem('hospitalID'))
    }, [])

    const doctorName = async (doctorID) => {
        let res = await doctorGetInfo(doctorID)
        return (res.data.firstName)
    }

    const addHospital = async () => {
        let res = await doctorHospitalAddEntry(userState.accountID, hospitalID, department)
        if (departmentList[department]) {
            departmentList[department].push([userState.accountID, await doctorName(userState.accountID)])
        } else {
            departmentList[department] = [[userState.accountID, await doctorName(userState.accountID)]]
        }

        setDepartmentList(departmentList)
        setAddingHospital(false)
    }

    return ( 
        <div className="hospitalPublic">
            <Row style={{marginTop: "50px"}}>
                <Col >
                <Card style={{ width: '800px', margin:"10px 0px 0px 100px", textAlign: "left" }}>
                    <Card.Header as="h2">{`${data.name}`}</Card.Header>
                
                    <Card.Body>
                        <p>{ `${data.address} ${data.city}` }</p>
                    </Card.Body>
                </Card>
                </Col>

                

                <Col xs={4} style={{margin: "0px 50px"}}>
                    <Row>
                        <Col xs={8}>
                        <h3>Departements</h3> 
                        </Col>
                        <Col>
                        {userState.accountType!='doctor' &&
                        <OverlayTrigger key="top" placement="bottom"
                                overlay={
                                <Tooltip id={`tooltip`}> Only <strong>{"doctors"}</strong> can link with a hospital</Tooltip>
                                }
                                >
                                <span className="d-inline-block">
                        <Button disabled variant="outline-success" onClick={()=>{setAddingHospital(true)}}>Link with hospital</Button>
                        </span>
                        </OverlayTrigger>
                        }
                        {userState.accountType=='doctor' && 
                        <Button variant="outline-success" onClick={()=>{setAddingHospital(true)}}>Link with hospital</Button>
                        }
                        </Col>
                    </Row>

                    { addingHospital &&
                    <Card style={{ width: '500px', margin: '20px auto',textAlign: "left" }}>
                        
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
                    
                    <hr/>
                    <Tab.Container id="list-group-tabs-example">
                    <Row>
                        <Col sm={4}>
                        <ListGroup>
                            {departmentList && Object.entries(departmentList).map(([key, value]) => (
                                <ListGroup.Item action href={`#${key}`}>
                                {key}
                                </ListGroup.Item>
                            ) )}
                        </ListGroup>
                        </Col>
                        <Col sm={8}>
                        <Tab.Content>
                            {departmentList && Object.entries(departmentList).map(([key, value]) => (
                                <Tab.Pane eventKey={`#${key}`}>
                                    <ListGroup>
                                        {value.map((item) => (
                                            <ListGroup.Item>{item[1]}</ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Tab.Pane>
                            ) )}
                            
                        </Tab.Content>
                        </Col>
                    </Row>
                    </Tab.Container>
                </Col>
            </Row>

        </div>
     );
}
 
export default HospitalPublic;