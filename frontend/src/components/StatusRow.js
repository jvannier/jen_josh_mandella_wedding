import React, { useEffect, useState } from "react";
import './StatusRow.css';
import { Td, Tr } from 'react-super-responsive-table';


function StatusRow(props) {
    let [checked, setChecked] = useState(props.status.checked);

    let [statusTextContainer, setStatusTextContainer] = useState();
    let [text, setText] = useState(props.status.text);

    useEffect(() => {
        if (props.user.isAdmin) {
            setStatusTextContainer(
                <div className="status">
                    <input
                        value={text}
                        type="text" className="textInput"
                        onChange={event => {
                            setText(event.target.value);
                        }}
                    />
                    <input
                        type="submit" value="Update"
                        onClick={event => {console.log("TODO: update status in DB (and checked status?")}}
                    />
                </div>
            );
        } else {
            setStatusTextContainer(
                <span id="statusTextItem">{props.status.text}</span>
            );
        }
        // eslint-disable-next-line
    }, [props.user.isAdmin, text])

    return (
        <Tr>
            <Td>
                <div className="status">
                    <input
                        type="checkbox"
                        onChange={() => {
                            props.status.setChecked(!checked, props.user);
                            setChecked(!checked);
                        }}
                        checked={checked}
                        disabled={!props.user.isAdmin}
                    />
                    { checked === true ? "Yes" : "No" }
                </div>
            </Td>
            <Td>
                {/* <div className="status"> */}
                    {statusTextContainer}
                {/* </div> */}
            </Td>
        </Tr>
    );
}

export default StatusRow;