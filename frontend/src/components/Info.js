import React from "react";
import NavCard from "./NavCard";
import BridalGuard from "./infoCardComponents/BridalGuard";
import Colors from "./infoCardComponents/Colors";
import Hotels from "./infoCardComponents/Hotels";
import Location from "./infoCardComponents/Location";
import QA from "./infoCardComponents/Q&A";
import Registry from "./infoCardComponents/Registry";


function Info() {
    let cardComponents = {
        "Location": <Location/>,
        "Hotels": <Hotels/>,
        "Colors": <Colors/>,
        "Wedding Registry": <Registry/>,
        "Wedding Party": <BridalGuard/>,
        "Q & A": <QA/>,
    };  // name to component mapping

    return <NavCard
        cardComponents={cardComponents}
        defaultActiveKey="#Location"
    />;
}

export default Info;