import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Hotel.css";


function Hotel() {
    return (
        <Fragment>
            <Card.Title>Recommended Hotel: MGM Grand Detroit</Card.Title>
            <Card.Text id="hotelText">
                There will be shuttles going to two different hotels (see below) from the wedding venue from -TODO- to -TODO- pm.
                <br/>
                <br/>
                For people who want to sleep / have quiet OR just don't want to pay the very large price tag attached to the MGM Grand Detroit Hotel, there is a Comfort Inn.
                <Button
                    className="cardButton"
                    href="https://www.reservations.com/hotel/detroit-regency-hotel-detroit-mi"
                >
                    Comfort Inn
                    <br/>
                    1999 E Jefferson Ave
                    <br/>
                    Detroit, Michigan 48207
                </Button>
                <br/>
                We will be staying at the MGM Grand Detroit to be loud and party all night.
                <br/>
                <Button
                    className="cardButton"
                    href="https://www.reservations.com/hotel/mgm-grand-detroit"
                >
                    MGM Grand Detroit
                    <br />
                    1777 3rd Street
                    <br/>
                    Detroit, Michigan 48226
                    <br/>
                </Button>

            </Card.Text>
        </Fragment>
    );
}

export default Hotel;