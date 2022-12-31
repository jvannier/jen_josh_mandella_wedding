import React, { useState } from "react";
import "./RSVP.css";
import RSVPDataStructure from "../dataStructures/rsvp";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function RSVP(props) {
    let [response, setResponse] = useState(false);
    let [songSuggestion, setSongSuggestion] = useState("");
    let [food, setFood] = useState("");

    if (props.user.rsvp === null) {
        props.user.rsvp = new RSVPDataStructure(
            response, setResponse, food, setFood,
            songSuggestion, setSongSuggestion, props.user,
        )
    }

    function submit(response, event) {
        event.preventDefault();
        props.user.rsvp.setResponse(response);

        // Send to api
        props.user.rsvp.submit();
    }

    return (
        <div id="rsv">
            <p id="currentRSVP">Current RSVP: {props.user.rsvp.response ? "Yes" : "No"}</p>
            <div className="page" id="rsvpPage">
                <span id="yes">
                    <div className="rsvpForm">
                        <Form.Label>Food Selection:</Form.Label><br/>
                        <Form.Select
                            aria-label="select dropdown"
                            className="rsvpInput"
                            onChange={event => props.user.rsvp.setFood(event.target.value)}
                        >
                            <option>Open this select menu</option>
                            <option value="Food">Food</option>
                            <option value="OtherFood">OtherFood</option>
                        </Form.Select>
                        <br/>
                        <br/>

                        <Form.Label>Wedding Song Suggestion:</Form.Label><br/>
                        <Form.Control
                            className="rsvpInput"
                            type="text"
                            value={props.user.rsvp.songSuggestion}
                            onChange={event => props.user.rsvp.setSongSuggestion(event.target.value)}
                        />
                        <br/>
                        <br/>
                        <Button id="yesButton" onClick={event => submit(true, event)}>
                            Yes
                        </Button>
                    </div>
                </span>
                <span id="no">
                    <Button id="noButton" onClick={event => submit(false, event)}>
                        No
                    </Button>
                </span>
            </div>
        </div>
    );
}

export default RSVP;