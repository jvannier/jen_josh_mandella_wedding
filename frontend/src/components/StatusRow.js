import React, { useState } from "react";
import './StatusRow.css';
import { Td, Tr } from 'react-super-responsive-table';


function StatusRow(props) {
    let [checked, setChecked] = useState(props.status.checked);

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
                <div className="status">
                    {props.status.text}
                </div>
            </Td>
        </Tr>
    );
}

export default StatusRow;