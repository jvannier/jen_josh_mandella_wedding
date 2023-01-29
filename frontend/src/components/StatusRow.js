import React, { useEffect, useState } from "react";
import './StatusRow.css';
import { Td, Tr } from 'react-super-responsive-table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function StatusRow(props) {
    let [checked, setChecked] = useState(props.status.checked);

    let [statusTextContainer, setStatusTextContainer] = useState();
    let [text, setText] = useState(props.status.text);

    useEffect(() => {
        // Using state for checked / text here because props.status isn't in state
        setText(props.status.text);
        setChecked(props.status.checked);
        // eslint-disable-next-line
    }, [props.status.text, props.status.checked]);

    useEffect(() => {
        if (props.user.isAdmin) {
            setStatusTextContainer(
                <div className="status">
                    <div className="text">{text}</div>
                    <Button className="statusButton" id="deleteStatus"
                        onClick={event => props.status.deleteStatus(props.user)}
                    >
                        Delete
                    </Button>
                </div>
            );
        } else {
            setStatusTextContainer(
                <span id="statusTextItem">{props.status.text}</span>
            );
        }
        // eslint-disable-next-line
    }, [props.user.isAdmin, checked, text])

    return (
        <Tr>
            <Td>
                <div className="status">
                    <Form.Check
                        type="checkbox"
                        label={ checked === true ? "Yes" : "No" }
                        onChange={() => {
                            props.status.setChecked(!checked, props.user);
                            setChecked(!checked);
                        }}
                        checked={checked}
                        disabled={!props.user.isAdmin}
                    />
                </div>
            </Td>
            <Td className="statusTd">
                {statusTextContainer}
            </Td>
        </Tr>
    );
}

export default StatusRow;