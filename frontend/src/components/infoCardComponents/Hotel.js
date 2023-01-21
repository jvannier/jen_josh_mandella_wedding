import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function Hotel() {
    return (
        <Fragment>
            <Card.Title>Recommended Hotel: MGM Grand Detroit</Card.Title>
            <Card.Text>
                1777 3rd Street
                <br/>
                Detroit, Michigan 48226
                <br/>
                <br/>
                There will be shuttles going to the hotel from the wedding venue from -TODO- to -TODO- pm.
                <br/>
                <br/>
                We will be (it is not done yet - TODO) booking two blocks of rooms in this hotel - one for people who want to sleep / have quiet and one for those of us that plan to party all night.

or motel6
            </Card.Text>
            <Button
                className="cardButton"
                href="https://www.reservations.com/hotel/mgm-grand-detroit"
            >
                Hotel Website
            </Button>
        </Fragment>
    );
}

export default Hotel;