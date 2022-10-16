import React, { useEffect, useState } from "react";
import Status from "../dataStructures/status";
import AdminStatusRow from "./AdminStatusRow";
import StatusRow from "./StatusRow";
import './Statuses.css';
import {Table, Thead, Tbody, Th, Tr} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


function Statuses(props) {
    let [statusRows, setStatusRows] = useState([]);
    let [adminInput, setAdminInput] = useState();

    useEffect(() => {
        setStatusRows(Status.getStatuses());
    }, []);

    useEffect(() => {
        if (props.user.isAdmin) {
            setAdminInput(<AdminStatusRow user={props.user}/>);
        } else {
            setAdminInput();
        }
        // eslint-disable-next-line
    }, [props.user.isAdmin])

    return (
        <div className="page" id="statusPage">
            <div id="statusText">
                <p>
                    We have a wedding planner. She's great.
                    <br/>
                    <br/>
                    No, the login button does not work. Yet.
                </p>
                <Table role="grid">
                    <Thead>
                        <Tr>
                            {
                                Status.fields.map((field, index) => (
                                    <Th scope="col" key={index}>{field}</Th>
                                ))
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {statusRows.map((status, index) => (
                            <StatusRow key={index} user={props.user} status={status}/>
                        ))}
                        {adminInput}
                    </Tbody>
                </Table>
            </div>
        </div>
    );
}

export default Statuses;