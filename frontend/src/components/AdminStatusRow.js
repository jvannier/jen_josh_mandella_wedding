import React, { useState } from "react";
import Status from "../dataStructures/status";
import "./AdminStatusRow.css";
import './StatusRow.css';
import { Td, Tr } from 'react-super-responsive-table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function AdminStatusRow(props) {
    let [checked, setChecked] = useState(false);
    let [text, setText] = useState("");
    let newStatus;

    const handleSubmit = async () => {
        newStatus = new Status(checked, text);
        await newStatus.addStatusInDB(props.user);
        window.location.reload(false);  // Hack: Force re-get and render rows
    }

    return (
        <Tr>
            <Td>
                <div className="status">
                    <Form.Check
                        type="checkbox"
                        label={ checked === true ? "Yes" : "No" }
                        onChange={() => {
                            setChecked(!checked);
                        }}
                        disabled={!props.user.isAdmin}
                    />
                </div>
            </Td>
            <Td>
                <div className="status">
                    <Form.Control
                        value={text}
                        type="text" className="textInput"
                        onChange={event => {
                            setText(event.target.value)
                        }}
                    />
                    <Button className="statusButton" id="addStatus" onClick={handleSubmit}>
                        Create
                    </Button>
                </div>
            </Td>
        </Tr>
    );
}

export default AdminStatusRow;