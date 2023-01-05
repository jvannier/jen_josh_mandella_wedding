import React from "react";
import NavCard from "./NavCard";
import BridalGaurd from "./infoCardComponents/BridalGaurd";
import Colors from "./infoCardComponents/Colors";
import Hotels from "./infoCardComponents/Hotels";
import Location from "./infoCardComponents/Location";
import Registry from "./infoCardComponents/Registry";


function Info() {
    let cardComponents = {
        "Location": <Location/>,
        "Hotels": <Hotels/>,
        "Colors": <Colors/>,
        "Wedding Registry": <Registry/>,
        "Wedding Party": <BridalGaurd/>,
    };  // name to component mapping

    return <NavCard
        cardComponents={cardComponents}
        defaultActiveKey="#Location"
    />;
}

export default Info;