import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Hotels(props) {
    return (
        <Fragment>
            <Card.Title>Hotel Options</Card.Title>
            <Card.Text>
                Meow
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
        </Fragment>
    );
}

export default Hotels;