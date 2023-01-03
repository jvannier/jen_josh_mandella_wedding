import React from "react";
import NavCard from "./NavCard";
import Users from "./adminCardComponents/Users";


function Admin(props) {
    let cardComponents = {
        "Users": <Users user={props.user}/>,
    };  // name to component mapping

    return <NavCard cardComponents={cardComponents}/>;
}

export default Admin;