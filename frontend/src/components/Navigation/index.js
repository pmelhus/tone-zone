import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
              <a className="home-nav-button">Home</a>
            </li>
            <li>
              <a className='playlist-nav-button'>Stream</a>
            </li>
            <li>
              <a className='library-button'>Library</a>
            </li>
          </ul>
        </nav>
        <div className="profile-button">{isLoaded && sessionLinks}</div>
      </div>
    </header>
  );
}

export default Navigation;
