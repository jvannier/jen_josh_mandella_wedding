import React, { useEffect } from "react";
import './Status.css';


function Status(props) {
    useEffect(() => {
        // TODO Fetch status from DB
        // user specific information?
    }, []);

    return (
        <div className="page" id="status_page">
            <div id="status_text">
                <p>
                    We have a wedding planner. She's great.
                    <br/>
                    <br/>
                    No, the login button does not work. Yet.
                </p>
            </div>
        </div>
    );
}

export default Status;