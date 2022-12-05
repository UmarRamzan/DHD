import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { hospitalGetInfo } from "../API/api";
import Card from 'react-bootstrap/Card';

const HospitalPublic = () => {

    const [data, setData] = useState({})

    const location = useLocation()

    useEffect(() => {
        let hospitalID = location.state.hospitalID

        let data = hospitalGetInfo(hospitalID)
        data.then((res) => {console.log(data); setData(res.data)})
    }, [])

    return ( 
        <div className="hospitalPublic">
            <h1>{ data.name }</h1>
            <p>{ data.city }</p>
            <p>{ data.address }</p>

            <Card style={{ width: '1300px', margin: "auto" }}>
                <Card.Body>
                    <Card.Title>Departements</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
     );
}
 
export default HospitalPublic;