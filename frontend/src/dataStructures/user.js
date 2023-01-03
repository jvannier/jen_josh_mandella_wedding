import jwt_decode from "jwt-decode";
import { API_URL } from "./consts";


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
        if (userID !== this.userID && userID !== null) {
            this.setUserIDState(userID);
            localStorage.setItem("id", userID);
        }
    }
    
    setUserName(userName) {
        if (userName !== this.userName && userName !== null) {
            this.setUserNameState(userName);
            localStorage.setItem("userName", userName);
        }
    }
    
    setToken(token) {
        if (token !== this.token && token !== null) {
            this.setTokenState(token);
            localStorage.setItem("token", token);
        }
    }

    readFromLocalStorage() {
        let userID = localStorage.getItem("id");
        let userName = localStorage.getItem("userName");
        let token = localStorage.getItem("token");

        this.setUserID(userID);
        this.setUserName(userName);
        this.setToken(token);
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

        // PUT user to DB - if user exists just updates login_expiration_time
        let query_params = [
            ["googleid", responsePayload.sub],  // The unique ID of the user's Google Account
            ["firstname", responsePayload.given_name],
            ["lastname", responsePayload.family_name],
            ["isadmin", "f"],
            ["accountcreated", "1770-01-01"],  // TODO: SHOULDN'T BE A QUERY PARAM
            ["lastlogin", "1770-01-01"],  // TODO: SHOULDN'T BE A QUERY PARAM
            // ["expiration_date", responsePayload.exp],  // TODO. Note: is an integer
        ];
        query_params = query_params.map(
            param => `${param[0]}=${param[1]}`
        ).join("&");
        // await fetch(
        //     API_URL + `/users/PUT?${query_params}`,
        //     {method: 'PUT'},
        // );

        this.setUserID(responsePayload.sub);
        this.setUserName(responsePayload.name);

        // TODO: Call API to get/create token and if is isAdmin
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
        // this.setIsAdmin(true);
        return new Promise((resolve, reject) => resolve({
            "admin": false,
            // "admin": true,
            "loggedIn": false,
            // "loggedIn": true,
        }));
    }
}

export default User;


export let getAllUsers = async (user) => {
    // TODO: get all users from api
    // TODO: probably need to convert rsvp from "t" / "f" to "yes"/ "no"
    return [
        ["jen", "no", "food", "song"],
        ["jen1", "yes", "otherFood", "song2"],
    ];
}
