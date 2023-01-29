import React, { Fragment, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./Invitees.css";


function Invitees(props) {
    let loggedout = "Please Re-Login to view.";
    let [data, setData] = useState(loggedout);
    
    useEffect(() => {
        async function fetchData() {
            if (props.user.isLoggedInAdmin()) {
                // Get users from database
                setData(
                    <iframe
                        id="inviteesIframe"
                        title="Invitees"
                        src="https://docs.google.com/spreadsheets/d/1MHa6Nob1_AnkE9sApFCZ2k5lGf6oDXCIF9u0slg1jVE/edit?usp=sharing"
                    />
                );
            } else {
                setData(loggedout);
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [props.user.token, props.user.isAdmin]);

    return (
        <Fragment>
            <Card.Title>Invitees</Card.Title>
            {data}
        </Fragment>
    );
}

export default Invitees;