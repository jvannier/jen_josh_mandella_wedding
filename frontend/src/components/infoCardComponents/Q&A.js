import React, { Fragment } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Q&A.css";
import { API_URL } from "../../dataStructures/consts";


function QA() {
    let questionAndAnswers = [
        ["How do I RSVP?", "Login using the Google login button upper right hand of the page, then an RSVP tab will appear in the bar at the top of the page. Click on it to navigate to the RSVP form. Google will tell us all of your information in your gmail profile so you won't have to fill anything other than your RSVP and food selection, with an optional song suggestion."],
        ["I have +1s, how do I RSVP for them?", "Have them RSVP via this site. Ideally, also let the Bride and/or Groom know."],
        ["Where/When is the rehearsal dinner?", "The rehearsal dinner will be the Thursday night before the wedding (so July 6th), and it will be at -TODO-."],
        ["What is the dress code?", "Please arrive dressed in cocktail attire."],
        ["Is the venue child-friendly?", "We will be having an open bar, so, unfortunately, the venue is not suitable for children."],
        ["When do I arrive?",
            <span>
                Please arrive between 5pm and 5:30pm if you plan to attend the ceremony. If you plan to attend just the reception please arrive any time between 6pm and 11pm.
                <Button className="cardButton" href={`${API_URL}/info#Location`}>
                    Click here for more information.
                </Button>
            </span>
        ],
        ["Where do I park?", "There is a good amount of onsite parking, but you may want to consider parking at the hotel you'll be staying at and sharing a ride to the venue, as you may want to utilize the shuttles going from the venue to the hotel after the reception. No driving and drinking, please. :)"],
        ["I'm from out of town. Where do I stay?",
            <Button className="cardButton" href={`${API_URL}/info#Hotel`}>
                Click here for more information.
            </Button>
        ],
        ["What happens if I'm late?", "The ceremony is between 5:30pm and 6pm. Arriving anytime from 5pm to 5:30pm or after 6pm is fine."],
        ["Do I need to bring anything?", "No, just your beautiful self."],
        ["Other Questions?", "Contact the Bride and/or Groom with any further questions. We're happy to answer them!"],
    ];

    let questionAndAnswersCards = questionAndAnswers.map((entry, index) => {
        return (
            <Card className="questionCard" key={index}>
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