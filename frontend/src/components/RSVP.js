import React, { useEffect, useState } from "react";
import "./RSVP.css";
import RSVPDataStructure from "../dataStructures/rsvp";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {Table, Thead, Tbody, Td, Th, Tr} from 'react-super-responsive-table';


function RSVP(props) {
    let [response, setResponse] = useState(false);
    let [songSuggestion, setSongSuggestion] = useState("");
    let [food, setFood] = useState("");

    let [popup, setPopup] = useState(false);
    let popupHtml = (
        <Modal show={popup} onHide={() => setPopup(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Thank you!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table role="grid" className="rsvpTable">
                    <Thead className="rsvpTable">
                        <Tr className="rsvpTable">
                            <Th scope="col" className="rsvpTable">Response</Th>
                            <Th scope="col" className="rsvpTable">Meal Selection</Th>
                            <Th scope="col" className="rsvpTable">Song Suggestion</Th>
                        </Tr>
                    </Thead>
                    <Tbody className="rsvpTable">
                        <Tr className="rsvpTable">
                            <Td key="response" className="rsvpTable">{response ? "Yes" : "No"}</Td>
                            <Td key="food" className="rsvpTable">{food}</Td>
                            <Td key="songSuggestion" className="rsvpTable">{songSuggestion}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );

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
            {popupHtml}
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
                            <Button variant="light" id="yesButton" onClick={event => {
                                submit(true, event);
                                setPopup(true);
                            }}>
                                Yes
                            </Button>
                        </div>
                    </Card>
                </span>
                <span id="no">
                    <Button variant="light" id="noButton" onClick={event => {
                        submit(false, event);
                        setPopup(true);
                    }}>
                        No
                    </Button>
                </span>
            </div>
        </div>
    );
}

export default RSVP;