import { get, put } from "../apiUtil";


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
        this.addStatusInDB(user);  // Update DB
    }

    setText(value) {  // More for internal consistency than anything else
        this.text = value;
    }

    async addStatusInDB(user) {
        let queryParams = [
            ["isdone",  this.checked],
            ["todo",  this.text],
        ];
        await put(user, "/statuses", queryParams);
    }

    async deleteStatus(user) {
        // TODO: Delete status in DB
        console.log("TODO: DELETE STATUS", this.checked, this.text);
    }
}

export default Status;