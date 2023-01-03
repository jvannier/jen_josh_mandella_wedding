import { API_URL } from "./consts";


class Status {
    static fields = [
        "Done",
        "Step",
    ];

    constructor(
        checked, text,
    ) {
        this.checked = checked;
        this.text = text;
    }

    static async getStatuses(user) {
        // let statuses = await fetch(API_URL + "/statuses/GET");
        // statuses = await statuses.json();
        let statuses = [
            [1, false, "aa"],
            [2, true, "bb"],
            [3, false, "cc"],
            [4, true, "dd"],
        ]; // TODO: delete this and uncomment above two lines when there's stuff in the DB

        let checked;
        let text;
        statuses = statuses.map(status => {
            checked = status[1];
            text = status[2];
            return new Status(
                checked, text,
            );
        });
        return statuses;
    }

    setChecked(value, user) {
        this.checked = value;

        // TODO: Update status in DB
    }

    addStatusInDB(user) {
        // TODO: Store new row data in DB
    }
}

export default Status;