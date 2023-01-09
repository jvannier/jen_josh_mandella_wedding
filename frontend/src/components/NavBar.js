import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './NavBar.css';
import Login from "./Login";
import NavDropdown from "react-bootstrap/NavDropdown";


function NavBar(props) {
  let [rsvpPageLink, setRsvpPageLink] = useState("");
  let [adminPageLink, setAdminPageLink] = useState("");

  useEffect(() => {
    props.user.isLoggedInAdmin().then(result => {
      if (result["loggedIn"] === true) {
        setRsvpPageLink(
          <Link className="link" id="rsvpLink" to="/rsvp">RSVP</Link>
        );

        if (result["admin"] === true) {
          setAdminPageLink(
            <Link className="link" id="adminLink" to="/admin#Users">Admin</Link>
          );
        } else {
          setAdminPageLink("");
        }
      } else {
        setAdminPageLink("");
        setRsvpPageLink("");
      }
    });
    // eslint-disable-next-line
  }, [props.user.userID, props.user.token, props.user.isAdmin]);

  return (
    <nav className="NavBar">
      <Link className="link" id="homeLink" to="/">Home</Link>
      <Link className="link" id="statusLink" to="/status">Status</Link>
      {rsvpPageLink}
      <NavDropdown className="link" id="infoLink" title="More Info">
        <NavDropdown.Item href="/info#Location">Location</NavDropdown.Item>
        <NavDropdown.Item href="/info#Hotel">Hotel</NavDropdown.Item>
        <NavDropdown.Item href="/info#Colors">Colors</NavDropdown.Item>
        <NavDropdown.Item href="/info#Wedding%20Registry">Wedding Registry</NavDropdown.Item>
        <NavDropdown.Item href="/info#Wedding%20Party">Wedding Party</NavDropdown.Item>
        <NavDropdown.Item href="/info#Q%20&%20A">Q & A</NavDropdown.Item>
      </NavDropdown>
      {adminPageLink}
      <div id="userName">
        {props.user.userName}
      </div>
      <Login user={props.user}/>
    </nav>
  );
}

export default NavBar;
