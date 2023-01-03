import React, { useEffect, useState } from "react";
import Status from "../dataStructures/status";
import AdminStatusRow from "./AdminStatusRow";
import StatusRow from "./StatusRow";
import './Statuses.css';
import {Table, Thead, Tbody, Th, Tr} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


function Statuses(props) {
    let [statusRows, setStatusRows] = useState([]);
    let [adminInput, setAdminInput] = useState();
    let [filter, setFilter] = useState();

    useEffect(() => {
        async function fetchData() {
            let statuses = await Status.getStatuses(props.user);
            
            if (filter !== undefined) {
                statuses = statuses.filter(status => {
                    return status.checked === filter ? true : false;
                });
            }
            statuses = statuses.map((status, index) => (
                <StatusRow key={index} user={props.user} status={status}/>
            ));
            setStatusRows(statuses);
        }
        fetchData();
        // eslint-disable-next-line
    }, [filter, props.user]);

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
    }, [props.user.isAdmin]);

    return (
        <div className="page" id="statusPage">
            <Card body id="statusText">
                <p>
                    We have a wedding planner. She's great.
                    <br/>
                    <br/>
                    No, the login button does not work. Yet.
                </p>
                <div id="filterButtonWrapper">
                    <Button className="filterButton" variant="info" onClick={() => setFilter()}>All</Button>
                    <Button className="filterButton" variant="success" onClick={() => setFilter(true)}>Complete</Button>
                    <Button className="filterButton" variant="danger" onClick={() => setFilter(false)}>Incomplete</Button>
                </div>
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
                        {statusRows}
                        {adminInput}
                    </Tbody>
                </Table>
            </Card>
        </div>
    );
}

export default Statuses;