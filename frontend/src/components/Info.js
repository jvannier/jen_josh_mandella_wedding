import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Colors from "./infoCardComponents/Colors"
import Hotels from "./infoCardComponents/Hotels"
import Location from "./infoCardComponents/Location"
import "./Info.css";


function Info() {
    let [body, setBody] = useState(<Location/>);

    return (
        <div className="page">
            <Card>
            <Card.Header>
                <Nav
                    variant="tabs"
                    defaultActiveKey="#location"
                    onSelect={eventKey => {
                        if (eventKey === "location") {
                            setBody(<Location/>);
                        } else if (eventKey === "hotels") {
                            setBody(<Hotels/>);
                        } else if (eventKey === "colors") {
                            setBody(<Colors/>);
                        }
                    }}
                >
                    <Nav.Item>
                        <Nav.Link eventKey="location" href="#location">Location</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="hotels" href="#hotels">Hotels</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="colors" href="#colors">Colors</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            <Card.Body>{body}</Card.Body>
            </Card>
        </div>
    );
}

export default Info;