import React, { Fragment, useEffect, useState } from "react";
import {Table, Thead, Tbody, Td, Th, Tr} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { getAllUsers } from "../../dataStructures/user";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Users.css";


function Users(props) {
    let [users, setUsers] = useState([]);
    let [filter, setFilter] = useState();
    
    useEffect(() => {
        async function fetchUsers() {
            if (props.user.isLoggedInAdmin()) {
                // Get users from database
                let users = await getAllUsers(undefined);

                if (filter) {
                    users = users.filter(user => {
                        return user[1] === filter ? true : false;
                    });
                }
                setUsers(users);
            } else {
                setUsers([]);
            }
        }
        fetchUsers();

        // eslint-disable-next-line
    }, [props.user.token, props.user.isAdmin, filter]);

    return (
        <Fragment>
            <Card.Title>Users</Card.Title>
            <div id="filterButtonWrapper">
                <Button className="filterButton" variant="info" onClick={() => setFilter()}>All</Button>
                <Button className="filterButton" variant="success" onClick={() => setFilter("yes")}>RSVP Yes</Button>
                <Button className="filterButton" variant="danger" onClick={() => setFilter("no")}>RSVP No</Button>
            </div>
            <Table role="grid">
                <Thead>
                    <Tr>
                        <Th scope="col">User</Th>
                        <Th scope="col">RSVP</Th>
                        <Th scope="col">Meal Selection</Th>
                        <Th scope="col">Song Suggestion</Th>
                    </Tr>
                </Thead>
                <Tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <Tr key={index}>
                                        {
                                            user.map((field, index) => (
                                                <Td key={index}>{field}</Td>
                                            ))
                                        }     
                                    </Tr>
                                )
                            })
                        }
                </Tbody>
            </Table>
        </Fragment>
    );
}

export default Users;