import React, { Fragment } from "react";
import Card from 'react-bootstrap/Card';
import "./Q&A.css";


function QA() {
    let questionAndAnswers = [
        ["wat?", "no"],
        ["question", "answer"],
    ];

    let questionAndAnswersCards = questionAndAnswers.map(entry => {
        return (
            <Card className="questionCard">
                <Card.Body>
                    <Card.Title>{entry[0]}</Card.Title>
                    <Card.Text>{entry[1]}</Card.Text>
                </Card.Body>
            </Card>
        );
    });
    return (
        <Fragment>
            <Card.Title>Q & A</Card.Title>
            {questionAndAnswersCards}
        </Fragment>
    );
}

export default QA;