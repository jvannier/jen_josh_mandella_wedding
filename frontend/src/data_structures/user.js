class User {
    constructor(userID, setUserID, isAdmin, setIsAdmin, token, setToken) {
        this.userID = userID;
        this.setUserID = setUserID;

        this.isAdmin = isAdmin;
        this.setIsAdmin = setIsAdmin;

        this.token = token;
        this.setToken = setToken;
    }
}

export default User;