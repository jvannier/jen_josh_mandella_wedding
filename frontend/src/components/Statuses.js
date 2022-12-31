import React, { useEffect, useState } from "react";
import Status from "../dataStructures/status";
import AdminStatusRow from "./AdminStatusRow";
import StatusRow from "./StatusRow";
import './Statuses.css';
import {Table, Thead, Tbody, Th, Tr} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Card from 'react-bootstrap/Card';


function Statuses(props) {
    let [statusRows, setStatusRows] = useState([]);
    let [adminInput, setAdminInput] = useState();

    useEffect(() => {
        async function fetchData() {
            setStatusRows(await Status.getStatuses(props.user));
        }
        fetchData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (props.user.isAdmin) {
            setAdminInput(
                <AdminStatusRow
                    setStatusRows={setStatusRows}
                    user={props.user}
                />
            );
        } else {
            setAdminInput();
        }
        // eslint-disable-next-line
    }, [props.user.isAdmin])

    return (
        <div className="page" id="statusPage">
            <Card body id="statusText">
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
            </Card>
        </div>
    );
}

export default Statuses;