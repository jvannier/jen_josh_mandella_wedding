import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import "./NavCard.css";


function NavCard(props) {
    let componentNames = Object.entries(props.cardComponents).map(component => {
        return component[0];  // component name
    });

    let [body, setBody] = useState(props.cardComponents[componentNames[0]]);

    return (
        <div className="page">
            <Card>
            <Card.Header>
                <Nav
                    variant="tabs"
                    defaultActiveKey="#location"
                    onSelect={eventKey => setBody(props.cardComponents[eventKey])}
                >
                    {
                        componentNames.map(name => {
                            return <Nav.Item key={name}>
                                <Nav.Link eventKey={name} href={"#" + name}>{name}</Nav.Link>
                            </Nav.Item>
                        })
                    }
                </Nav>
            </Card.Header>
            <Card.Body>{body}</Card.Body>
            </Card>
        </div>
    );
}

export default NavCard;