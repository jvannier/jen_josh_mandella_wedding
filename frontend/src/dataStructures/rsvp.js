import { get, put } from "../apiUtil";


class RSVP {
    static async getCurrentRSVP(user) {
        // Get current RSVP from API
        // let rsvp = await get(user, "/rsvp/" + user.userID);
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

    static async submit(user, response, food, songSuggestion) {
        // TODO: Send update to db
        console.log("user:", user);
        console.log("rsvp:", response);
        console.log("food:", food);
        console.log("songSuggestion:", songSuggestion);

        // TODO: get right query params
        let queryParams = [
            ["rsvp", response ? "t" : "f"],
            ["food", food],
            ["songSuggestion", songSuggestion],
        ];
        // await put(user, "/rsvp", queryParams)
    }
}

export default RSVP;



export let getAllRSVPs = async (user) => {
    let rsvps = await get(user, "/rsvp");
    rsvps = await rsvps.json();

    let result = [];
    rsvps.forEach(rsvp => {
        result[rsvp[4]] = rsvp.slice(0, 4);
    });
    return result;
}
