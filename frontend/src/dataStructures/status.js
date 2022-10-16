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

    static getStatuses() {
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
}

export default Status;