import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import "./Info.css";


function Info(props) {
    return (
        <div className="paage">
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first">Active</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
            {/* <Card className="text-center">
                <Card.Header>Location</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Info
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className="text-center">
                <Card.Header>Hotels</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Info
                    </Card.Text>
                </Card.Body>
            </Card> */}
        </div>
    );
}

export default Info;