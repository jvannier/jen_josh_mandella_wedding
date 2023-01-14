import { get } from "../apiUtil";


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
        let statuses = await get(user, "/statuses");
        statuses = await statuses.json();

        let checked;
        let text;
        statuses = statuses.map(status => {
            checked = status[2];
            text = status[1];
            return new Status(
                checked, text,
            );
        });
        return statuses;
    }

    setChecked(value, user) {
        this.checked = value;
        this.submit(user);  // Update DB
    }

    addStatusInDB(user) {
        // TODO: Store new row data in DB
    }

    async submit(user) {
        // TODO: Update status in DB
        console.log("TODO: submit", this.checked, this.text)
    }
}

export default Status;