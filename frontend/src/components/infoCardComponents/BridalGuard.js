import React from "react";
import {Table, Tbody, Td, Tr} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Card from 'react-bootstrap/Card';


function BridalGuard() {
    return (
        <div>
            <Card.Title>Bridal Guard</Card.Title>
            <Card.Text>
                In the interest of inclusivity, fun, and minor rebellion we have decided to collectively call "bridesmaids" and "groomsmen" the "bridal party". The "maid of honor" is the "Captain of the Guard". Sounds cool to us.
            </Card.Text>
                <Table role="grid">
                <Tbody>
                    <Tr>
                        <Td>Officiant</Td>
                        <Td>Chris Quan Lee</Td>
                    </Tr>
                    <Tr>
                        <Td>Best Man</Td>
                        <Td>Chris Quan Lee</Td>
                    </Tr>
                    <Tr>
                        <Td>Captain of the Guard</Td>
                        <Td>Tali Ram</Td>
                    </Tr>
                    <Tr>
                        <Td>Bridal Guard</Td>
                        <Td>Sol Cyphers</Td>
                    </Tr>
                    <Tr>
                        <Td>Bridal Guard</Td>
                        <Td>Sharlene Mandella</Td>
                    </Tr>
                    <Tr>
                        <Td>Bridal Guard</Td>
                        <Td>Ben Bellis</Td>
                    </Tr>
                    <Tr>
                        <Td>Bridal Guard</Td>
                        <Td>Brett Geer</Td>
                    </Tr>
                    <Tr>
                        <Td>Flower Man</Td>
                        <Td>Brett Geer</Td>
                    </Tr>
                    <Tr>
                        <Td>Bridal Guard</Td>
                        <Td>Ken Cheng</Td>
                    </Tr>
                    <Tr>
                        <Td>Flower Man</Td>
                        <Td>Ken Cheng</Td>
                    </Tr>
                </Tbody>
            </Table>
        </div>
    );
}

export default BridalGuard;