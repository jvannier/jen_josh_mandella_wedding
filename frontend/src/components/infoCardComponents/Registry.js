import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Registry.css";


function Registry() {
    return (
        <Fragment>
            <Card.Title>Wedding Registry</Card.Title>
            <Button
                id="registryButton"
                href="todo?"
            >
                TODO: Go to wedding registry website
            </Button>
        </Fragment>
    );
}

export default Registry;