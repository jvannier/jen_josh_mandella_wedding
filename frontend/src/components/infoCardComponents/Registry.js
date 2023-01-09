import React from "react";
import Card from 'react-bootstrap/Card';
import "./Registry.css";


function Registry() {
    return (
        <div id="weddingIframeWrapper">
            <Card.Title>Wedding Registry</Card.Title>
            <iframe
                id="weddingIframe"
                title="Wedding Registry"
                src="https://registry.theknot.com/jennifer-vannier-josh-mandella-march-2024-mi/57972317"
            />
        </div>
    );
}

export default Registry;