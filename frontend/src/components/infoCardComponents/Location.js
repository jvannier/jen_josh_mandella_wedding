import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Location.css";


function Location() {
    return (
        <Fragment>
            <Card.Title>Roostertail Fairy Tail Weddings</Card.Title>
            <Card.Text id="locationText">
                100 Marquette Drive,
                <br/>
                Detroit, MI 48214
                <br/>
                <br/>
                Please arrive at between 5 and 5:30pm. The ceremony will start at 5:30pm.
            </Card.Text>
            <Button
                id="locationButton"
                href="https://roostertail.com/"
            >
                Roostertail Website
            </Button>
        </Fragment>
    );
}

export default Location;