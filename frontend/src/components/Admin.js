import React from "react";
import NavCard from "./NavCard";
import Invitees from "./adminCardComponents/Invitees";
import Users from "./adminCardComponents/Users";


function Admin(props) {
    let cardComponents = {
        "Users": <Users user={props.user}/>,
        "Invitees": <Invitees user={props.user}/>,
    };  // name to component mapping

    return <NavCard
        cardComponents={cardComponents}
        defaultActiveKey="#Users"
        // useHeader={true}
    />;
}

export default Admin;