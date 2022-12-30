import jwt_decode from "jwt-decode";


class User {
    constructor(
        userID, setUserID, userName, setUserName,
        token, setToken, isAdmin, setIsAdmin,
    ) {
        this.userID = userID;
        this.setUserIDState = setUserID;
        this.userName = userName;
        this.setUserNameState = setUserName;
        this.token = token;
        this.setTokenState = setToken;
        this.isAdmin = isAdmin;
        this.setIsAdmin = setIsAdmin;

        // Try to read from local storage
        this.readFromLocalStorage();
    }

    setUserID(userID) {
        if (userID !== this.userID) {
            this.setUserIDState(userID);
            localStorage.setItem("id", this.userID);
        }
    }
    
    setUserName(userName) {
        if (userName !== this.userName) {
            this.setUserNameState(userName);
            localStorage.setItem("userName", this.userName);
        }
    }
    
    setToken(token) {
        if (token !== this.token) {
            this.setTokenState(token);
            localStorage.setItem("token", this.token);
        }
    }

    readFromLocalStorage() {
        let userID = localStorage.getItem("id");
        let userName = localStorage.getItem("userName");
        let token = localStorage.getItem("token");

        if (userID !== this.userID) {
            this.setUserIDState(userID);
        }

        if (userName !== this.userName) {
            this.setUserNameState(userName);
        }

        if (token !== this.token) {
            this.setTokenState(token);
        }
    }

    logout() {
        this.setUserID();
        this.setUserName();
        this.setToken();
        this.setIsAdmin(false);

        // TODO: Call API to delete login token in DB

        localStorage.removeItem('id');
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
    }

    async login(credentialResponse) {
        const responsePayload = jwt_decode(credentialResponse.credential);

        // The unique ID of the user's Google Account:
        this.setUserID(responsePayload.sub);
        this.setUserName(responsePayload.given_name);

        // TODO: Call API to update login_expiration_time in DB
        // and get/create token and if isAdmin
        this.setIsAdmin(true);
        this.setToken("tokentotally");
    }

    async isLoggedIn() {
        // TODO: Call API for if logged in (check if token expired)
        // return new Promise((resolve, reject) => resolve(true));
        return new Promise((resolve, reject) => resolve(false));
    }

    async isLoggedInAdmin() {
        // TODO: Call API
        this.setIsAdmin(false);
        return new Promise((resolve, reject) => resolve({
            "admin": false,
            "loggedIn": false,
        }));
    }
}

export default User;