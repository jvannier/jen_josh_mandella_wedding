import { get, put } from "../apiUtil";


// TODO: Add some indication of success to rsvp, the knot filter thing breaks the website
class RSVP {
    static async getCurrentRSVP(user) {
        // Get current RSVP from API
        let rsvp = await get(user, "/rsvp/" + user.userID);
        rsvp = await rsvp.json();

        let response;
        let food;
        let songSuggestion;
        if (rsvp === undefined) {
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
        let queryParams = [
            ["rsvp", response ? "t" : "f"],
            ["mealselect", food],
            ["weddingsong", songSuggestion],
        ];
        await put(user, "/rsvp", queryParams);
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
