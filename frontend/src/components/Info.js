import React from "react";
import NavCard from "./NavCard";
import Colors from "./infoCardComponents/Colors";
import Hotels from "./infoCardComponents/Hotels";
import Location from "./infoCardComponents/Location";


function Info() {
    let cardComponents = {
        "Location": <Location/>,
        "Hotels": <Hotels/>,
        "Colors": <Colors/>,
    };  // name to component mapping

    return <NavCard cardComponents={cardComponents}/>
}

export default Info;