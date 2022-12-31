import { API_URL } from "./consts";


class RSVP {
    constructor(
        response, setResponse,
        food, setFood,
        songSuggestion, setSongSuggestion,
        user,
    ) {
        this.response = response;
        this.setResponseState = setResponse;
        this.food = food;
        this.setFoodState = setFood;
        this.songSuggestion = songSuggestion;
        this.setSongSuggestionState = setSongSuggestion;
        this.user = user;

        this.getCurrentRSVP();  // Get current RSVP from db
    }
    
    async getCurrentRSVP() {
        // Get current RSVP from API
        // let rsvp = await fetch(
        //     API_URL + "/rsvp/" + this.user.userID + "/GET",
        // );
        // rsvp = await rsvp.json();
        let rsvp = [1, false, "food", "lalala"]; // TODO: delete this and uncomment above lines when there's stuff in the DB

        let response;
        let food;
        let songSuggestion;
        if (rsvp.length < 1) {
            // No RSVP found
            response = false;
            food = "";
            songSuggestion = "";
        } else {
            response = rsvp[1];
            food = rsvp[2];
            songSuggestion = rsvp[3];
        }

        this.setResponse(response);
        this.setFood(food);
        this.setSongSuggestion(songSuggestion)
    }

    submit() {
        // TODO: Send update to db
        console.log("user:", this.user);
        console.log("rsvp:", this.response);
        console.log("food:", this.food);
        console.log("songSuggestion:", this.songSuggestion);
    }

    setFood(food) {
        this.food = food;
        this.setFoodState(food);
    }

    setResponse(response) {
        this.response = response;
        this.setResponseState(response);
    }

    setSongSuggestion(songSuggestion) {
        this.songSuggestion = songSuggestion;
        this.setSongSuggestionState(songSuggestion);
    }
}

export default RSVP;