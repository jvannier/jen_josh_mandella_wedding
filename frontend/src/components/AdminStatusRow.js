import React, { useState } from "react";
import Status from "../dataStructures/status";
import './StatusRow.css';
import { Td, Tr } from 'react-super-responsive-table';


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
                    <input
                        type="checkbox"
                        onChange={() => {
                            setChecked(!checked);
                        }}
                        checked={checked}
                        disabled={!props.user.isAdmin}
                    />
                    { checked === true ? "Yes" : "No" }
                </div>
            </Td>
            <Td>
                <div className="status">
                    <input type="text" onChange={event => {
                        setText(event.target.value)
                    }}/>
                    <input
                        type="submit" value="Add"
                        onClick={handleSubmit}
                    />
                </div>
            </Td>
        </Tr>
    );
}

export default AdminStatusRow;