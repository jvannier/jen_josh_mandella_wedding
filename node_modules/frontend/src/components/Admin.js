import React, { useEffect } from "react";
import './Admin.css';


function Admin(props) {
    useEffect(() => {
        // TODO Fetch status from DB
        // user specific information?
    }, []);

    return (
        <div className="page" id="adminPage">
            <p id="adminText">admin stuff</p>
        </div>
    );
}

export default Admin;