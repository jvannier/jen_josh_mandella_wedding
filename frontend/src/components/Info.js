import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavCard from "./NavCard";
import BridalGuard from "./infoCardComponents/BridalGuard";
import Colors from "./infoCardComponents/Colors";
import Hotel from "./infoCardComponents/Hotel";
import Location from "./infoCardComponents/Location";
import QA from "./infoCardComponents/Q&A";
import Registry from "./infoCardComponents/Registry";


function Info() {
    let location = useLocation();
    let cardComponents = {
        "Location": <Location/>,
        "Hotel": <Hotel/>,
        "Colors": <Colors location={location}/>,
        "Wedding Registry": <Registry/>,
        "Wedding Party": <BridalGuard/>,
        "Q & A": <QA/>,
    };  // name to component mapping

    useEffect(() => {
        if (location) {
            // Add whole page styling for colors page
            document.querySelector(".page").classList.remove("colors");
        }
        // eslint-disable-next-line
    }, [location]);

    return <NavCard
        cardComponents={cardComponents}
        defaultActiveKey="#Location"
    />;
}

export default Info;