import React, { Fragment, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import "./Colors.css";


function Colors(props) {
    useEffect(() => {
        // Add whole page styling
        document.querySelector(".page").classList.add("colors");
    }, [props.location]);

    return (
        <Fragment>
            <Card.Title>Wedding Colors</Card.Title>
            <Card.Text>
                Navy Blue and Lavender
            </Card.Text>
        </Fragment>
    );
}

export default Colors;