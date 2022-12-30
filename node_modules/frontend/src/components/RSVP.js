import React, { useEffect, useState } from "react";
import './RSVP.css';


function RSVP(props) {
    let [rsvp, setRSVP] = useState(false);
    // TODO: how use rsvp on page?

    useEffect(() => {
        // TODO Fetch user RSVP status from DB
    }, []);

    return (
        <div className="page" id="rsvpPage">
            <span id="yes">
                <p id="rsvpTextYes">Yes</p>
            </span>
            <span id="no">
                <p id="rsvpTextNo">No</p>
            </span>
        </div>
    );
}

export default RSVP;