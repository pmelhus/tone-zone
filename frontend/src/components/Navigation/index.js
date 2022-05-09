import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Navigation({ isLoaded, sessionUser }) {
  // const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  }

  return (
    <header>
      <div className="nav-div">
        <nav className='nav-main'>
          <ul className="ul-nav">
          <i id="logo"class="fa-solid fa-message-music fa-2xl"></i>

            <li>
              <NavLink to="/discover">
                <a>Home</a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/stream">
                <a>Stream</a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/you/library">
                <a>Library</a>
              </NavLink>
            </li>
          </ul>
          <div className="profile-button">
            <div>
              <NavLink to="/upload">
                <a>Upload</a>
              </NavLink>
            </div>
            <div>{isLoaded && sessionLinks}</div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
