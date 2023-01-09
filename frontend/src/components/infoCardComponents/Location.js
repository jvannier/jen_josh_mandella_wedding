import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Location() {
    return (
        <Fragment>
            <Card.Title>Roostertail Fairy Tail Weddings</Card.Title>
            <Card.Body>
                <Card.Text>
                    100 Marquette Drive,
                    <br/>
                    Detroit, MI 48214
                </Card.Text>
            </Card.Body>
            <Card.Text>
                Please arrive at between 5pm and 5:30pm. The ceremony will start at 5:30pm. The reception will start at 6pm and end at -TODO-pm.
            </Card.Text>
            <Button
                className="cardButton"
                href="https://roostertail.com/"
            >
                Roostertail Website
            </Button>
        </Fragment>
    );
}

export default Location;