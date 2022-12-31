import React, { useState } from "react";
import Status from "../dataStructures/status";
import './StatusRow.css';
import { Td, Tr } from 'react-super-responsive-table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function AdminStatusRow(props) {
    let [checked, setChecked] = useState(false);
    let [text, setText] = useState("");
    let newStatus;

    const handleSubmit = () => {
        newStatus = new Status(checked, text);
        newStatus.addStatusInDB(props.user);
        props.setStatusRows(statuses => statuses.concat(newStatus));
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
                        // checked={checked}
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
                    <Button variant="light" className="statusButton" onClick={handleSubmit}>
                        Add
                    </Button>
                </div>
            </Td>
        </Tr>
    );
}

export default AdminStatusRow;