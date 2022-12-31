import { API_URL } from "./consts";


class RSVP {
    static async getCurrentRSVP(user) {
        // Get current RSVP from API
        // let rsvp = await fetch(
        //     API_URL + "/rsvp/" + user.userID + "/GET",
        // );
        // rsvp = await rsvp.json();
        let rsvp = [1, false, "Food", "lalala"]; // TODO: delete this and uncomment above lines when there's stuff in the DB

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

        return [response, food, songSuggestion];
    }

    static submit(user, response, food, songSuggestion) {
        // TODO: Send update to db
        console.log("user:", user);
        console.log("rsvp:", response);
        console.log("food:", food);
        console.log("songSuggestion:", songSuggestion);
    }
}

export default RSVP;