import jwt_decode from "jwt-decode";
import { getAllRSVPs } from "./rsvp";
import { get, put } from "../apiUtil";


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
        let queryParams = [
            ["googleid", responsePayload.sub],  // The unique ID of the user's Google Account
            ["firstname", responsePayload.given_name],
            ["lastname", responsePayload.family_name],
            ["expiration", responsePayload.exp],
        ];
        let result = await put(-1, "/users", queryParams);
        result = await result.json();
        this.setToken(result["token"]);

        this.setUserID(responsePayload.sub);
        this.setUserName(responsePayload.name);

        // Check if user is set to be an admin
        await this.isLoggedIn();
    }

    async isLoggedIn() {
        return await this.isLoggedInAdmin()["loggedin"];
    }

    async isLoggedInAdmin() {
        let result =  await get(this, "/token");
        result = await result.json();
        this.setIsAdmin(result["admin"]);
        return result;
    }
}

export default User;


export let getAllUsers = async (user) => {
    let users = await get(user, "/users");
    users = await users.json();
    let rsvps = await getAllRSVPs(user);

    users = users.map(user => {
        let result = [
            `${user[2]} ${user[3]}`,  // Name
        ];

        if (user[1] in rsvps) {
            let rsvp = rsvps[user[1]];
            result.push(
                rsvp[1] ? "yes" : "no",  // RSVP
                rsvp[2],  // Food selection
                rsvp[3],  // Song Selection
            )
        } else {
            result.push("", "", "");
        }
        return result;
    });
    return users;
}
