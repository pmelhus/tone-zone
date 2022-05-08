import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded, sessionUser }) {
  // const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  }

  return (
    <header>
      <div className="nav-div">
        <nav>
          <ul>
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
            <div>
              <NavLink to={`/${sessionUser.username}`}>
                <a>Profile</a>
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
