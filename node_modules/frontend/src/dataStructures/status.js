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

    static getStatuses(user) {
        // TODO: Get statuses from DB

        return [
            new Status(true, "aaa"),
            new Status(false, "bbb"),
        ];
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