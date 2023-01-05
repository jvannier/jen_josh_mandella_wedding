import React, { useEffect, useState } from "react";
import "./RSVP.css";
import RSVPDataStructure from "../dataStructures/rsvp";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


function RSVP(props) {
    let [response, setResponse] = useState(false);
    let [songSuggestion, setSongSuggestion] = useState("");
    let [food, setFood] = useState("");

    useEffect(() => {
        async function fetchData() {
            let [startResponse, startFood, startSongSuggestion] = await RSVPDataStructure.getCurrentRSVP(props.user);
            setResponse(startResponse);
            setFood(startFood);
            setSongSuggestion(startSongSuggestion);
        }
        fetchData();
    }, [props.user]);

    function submit(response, event) {
        event.preventDefault();
        setResponse(response);

        // Send to api
        RSVPDataStructure.submit(props.user, response, food, songSuggestion);
    }

    return (
        <div id="rsv">
            <p id="currentRSVP">Current RSVP: {response ? "Yes" : "No"}</p>
            <div className="page" id="rsvpPage">
                <span id="yes">
                    <Card id="yesCard">
                        <div className="rsvpForm">
                            <Form.Label className="rsvpText">Food Selection:</Form.Label><br/>
                            <Form.Select
                                aria-label="select dropdown"
                                className="rsvpInput"
                                value={food}
                                onChange={event => setFood(event.target.value)}
                            >
                                <option>Open this select menu</option>
                                <option value="Food">Food</option>
                                <option value="OtherFood">OtherFood</option>
                            </Form.Select>
                            <br/>

                            <Form.Label className="rsvpText">Wedding Song Suggestion:</Form.Label><br/>
                            <Form.Control
                                className="rsvpInput"
                                type="text"
                                value={songSuggestion}
                                onChange={event => setSongSuggestion(event.target.value)}
                            />
                            <br/>
                            <Button variant="light" id="yesButton" onClick={event => submit(true, event)}>
                                Yes
                            </Button>
                        </div>
                    </Card>
                </span>
                <span id="no">
                    <Button variant="light" id="noButton" onClick={event => submit(false, event)}>
                        No
                    </Button>
                </span>
            </div>
        </div>
    );
}

export default RSVP;