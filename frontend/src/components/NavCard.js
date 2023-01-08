import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "./NavCard.css";


function NavCard(props) {
    let location = useLocation();
    let componentNames = Object.entries(props.cardComponents).map(component => {
        return component[0];  // component name
    });

    let [body, setBody] = useState(props.cardComponents[componentNames[0]]);

    useEffect(() => {
        if (location) {
            let tab = decodeURI(location.hash.slice(1));
            setBody(props.cardComponents[tab]);
        }
        // eslint-disable-next-line
    }, [location]);

    return (
        <div className="page">
            <Card className="navCard">
                <Card.Body>{body}</Card.Body>
            </Card>
        </div>
    );
}

export default NavCard;