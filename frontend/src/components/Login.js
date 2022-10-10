import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { useEffect } from "react";
import "./Login.css";


function Login(props) {
    function logout() {
        googleLogout();
        props.user.logout();
    }

    useEffect(() => {
        // Check user already logged in
        if (props.user.userID !== null) {
            // Check if the login has expired
            props.user.isLoggedIn().then(result => {
                if (result === false) {
                    logout();
                }
            })
        } else {
            logout();  // Make sure logged out correctly
        }
        // eslint-disable-next-line
    }, [props.user.token]);

    if (props.user.token === null) {
        // Login
        return (
            <GoogleLogin id="googleLogin"
                onSuccess={
                    credentialResponse => props.user.login(credentialResponse)
                }
                onError={(err) => {
                    console.log('Login Failed', err);
                    logout();
                }}
            />
        );
    } else {
        // Logout
        return (
            // eslint-disable-next-line
            <button role="button" id="logout" onClick={logout}>Logout</button>
        );
    }
}

export default Login;