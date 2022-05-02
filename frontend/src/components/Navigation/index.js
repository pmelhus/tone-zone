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
              <NavLink to='/discover'>
              <a className="home-nav-button">Home</a>
              </NavLink>
            </li>
            <li>
              <NavLink to='/stream'>
              <a className='playlist-nav-button'>Stream</a>
              </NavLink>
            </li>
            <li>
              <NavLink to='/library'>
              <a className='library-button'>Library</a>
              </NavLink>
            </li>
            <li>
              <NavLink to='/upload'>
                <a className='upload-button'>Upload</a>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="profile-button">{isLoaded && sessionLinks}</div>
      </div>
    </header>
  );
}

export default Navigation;
