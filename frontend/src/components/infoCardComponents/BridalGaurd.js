import React from "react";
import {Table, Thead, Tbody, Td, Th, Tr} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Card from 'react-bootstrap/Card';


function BridalGaurd(props) {
    return (
        <div>
            <Card.Title>Bridal Guard</Card.Title>
            <Card.Text>
                Todo: explanation: of gender neutral stuff bridal guard
                todo: Q&A section?
                todo: add header for role + name

                -- drop down by more info with the sub sections (link to them - my anchors don't work right now)
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
                        <Td>Bridal Captain</Td>
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
                        <Td>That one cool guy we haven't asked</Td>
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

export default BridalGaurd;