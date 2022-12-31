import React from "react";
import NavCard from "./NavCard";


function Admin(props) {
    let cardComponents = {
        "test": <div>placeholder</div>,
    };  // name to component mapping

    return <NavCard cardComponents={cardComponents}/>;
}

export default Admin;