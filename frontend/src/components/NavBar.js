import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './NavBar.css';
import Login from "./Login";


function NavBar(props) {
  let [adminPageLink, setAdminPageLink] = useState("");

  useEffect(() => {
    props.user.isLoggedInAdmin().then(result => {
      if (result === true) {
        setAdminPageLink(
          <Link className="link" id="adminLink" to="/admin">Admin</Link>
        );
      } else {
        setAdminPageLink("");
      }
    });
    // eslint-disable-next-line
  }, [props.user.userID, props.user.token, props.user.isAdmin]);

  return (
    <span className="NavBar">
      <Link className="link" id="homeLink" to="/">Home</Link>
      <Link className="link" id="statusLink" to="/status">Status</Link>
      {adminPageLink}
      <div id="userName">
        {props.user.userName}
      </div>
      <Login user={props.user}/>
    </span>
  );
}

export default NavBar;
