import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Fragment, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import User from "./data_structures/user"
import './App.css';


function App() {
  // User()
  // let [userID, setUserID] = useState(localStorage.getItem("id"));
  // let [userName, setUserName] = useState();
  // let [token, setToken] = useState(localStorage.getItem("token"));
  // let [isAdmin, setIsAdmin] = useState(false);

  // let [adminPageLink, setAdminPageLink] = useState("");

  // useEffect(() => {
  //   // is_logged_in_admin(userID, token).then(result => {
  //   //   if (result === true) {
  //   //     adminPageLink = <div>you are an admin</div>
  //   //   }
  //   // })
  // }, [token, isAdmin]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          // userID={userID} setUserID={setUserID}
          // userName={userName} setUserName={setUserName}
          // token={token} setToken={setToken}
        />
        <Routes>
          <Route exact path="/" element={
            <div>home page?</div>
          }/>
          <Route exact path="/about" element={
            <div>about page</div>
          }/>
          {/* {adminPageLink} */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
