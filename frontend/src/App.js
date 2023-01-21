import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import Admin from "./components/Admin";
import Info from "./components/Info"
import NavBar from "./components/NavBar";
import RSVP from "./components/RSVP"
import Statuses from "./components/Statuses"
import User from "./dataStructures/user"
import './App.css';


// TODO: change tab icon
function App() {
  let [userID, setUserID] = useState();
  let [userName, setUserName] = useState();
  let [token, setToken] = useState();
  let [isAdmin, setIsAdmin] = useState(false);

  let user = new User(
    userID, setUserID, userName, setUserName,
    token, setToken, isAdmin, setIsAdmin,
  );

  let [adminPageLink, setAdminPageLink] = useState("");
  let [rsvpPageLink, setRsvpPageLink] = useState("");

  useEffect(() => {
    user.isLoggedInAdmin().then(result => {
      if (result["loggedin"] === true) {
        setRsvpPageLink(
          <Route exact path="/rsvp" element={
            <RSVP user={user}/>
          }/>
        );

        if (result["admin"] === true) {
          setAdminPageLink(
            <Route exact path="/admin" element={
              <Admin user={user}/>
            }/>
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
  }, [user.userID, user.token, user.isAdmin]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar user={user}/>
        <Routes>
          <Route exact path="/*" element={
            <div
              className="page" id="home"
              role="img" aria-label="Save the date. July 8th"
            />
          }/>
          <Route exact path="/status" element={
            <Statuses user={user}/>
          }/>
          <Route exact path="/info" element={
            <Info user={user}/>
          }/>
          {rsvpPageLink}
          {adminPageLink}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
