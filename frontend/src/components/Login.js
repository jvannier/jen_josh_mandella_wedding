import { GoogleLogin, googleLogout } from '@react-oauth/google';
import React, { useEffect } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button"
// TODO: Custom login button


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

    if (!props.user.token) {
        // Login
        return (
            <span id="googleLogin">
                <GoogleLogin
                    onSuccess={
                        credentialResponse => props.user.login(credentialResponse)
                    }
                    onError={(err) => {
                        console.log('Login Failed', err);
                        logout();
                    }}
                />
            </span>
        );
    } else {
        // Logout
        return (
            // eslint-disable-next-line
            <Button role="button" id="logout" onClick={logout}>Logout</Button>
        );
    }
}

export default Login;