// import './NavBar.css';
// import Login from "./Login";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


function NavBar(props) {
  // let [adminPageLink, setAdminPageLink] = useState("");

  // useEffect(() => {
  //   if (props.userID !== undefined) {
  //     is_logged_in_admin(props.userID, props.token).then(result => {
  //       if (result === true) {
  //         setAdminPageLink(<Link id="adminLink" to="/admin">Admin</Link>);
  //       } else {
  //         setAdminPageLink("");
  //       }
  //     });
  //   } else {
  //     setAdminPageLink("");
  //   }
  // }, [props.token]);

  return (
    <span className="NavBar">
      <Link id="homeLink" to="/">Home</Link>
      <Link id="aboutLink" to="/about">About</Link>
      {/* {adminPageLink}
      <div id="userName">
        {props.userName}
      </div>
      <Login
        userID={props.userID} setUserID={props.setUserID}
        setUserName={props.setUserName}
        token={props.token} setToken={props.setToken}
      /> */}
    </span>
  );
}

export default NavBar;
