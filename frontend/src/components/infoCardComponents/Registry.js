import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import "./Registry.css";
import { REGISTRY_WEBSITE } from "../../dataStructures/consts"


function Registry(props) {
    return (
        <Fragment>
            <Card.Title>Wedding Registry</Card.Title>
            <Button
                id="registryButton"
                href={REGISTRY_WEBSITE}
            >
                Go to wedding registry website
            </Button>
        </Fragment>
    );
}

export default Registry;