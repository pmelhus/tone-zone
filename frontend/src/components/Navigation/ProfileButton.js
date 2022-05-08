import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { Redirect, useHistory } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ sessionUser }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let history = useHistory();
  // const user = useSelector(state => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  // console.log(user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    dispatch(sessionActions.restoreUser());
    setIsLoaded(true);
  }, [dispatch]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <div className="menu">
      <button onClick={openMenu}>
        <img
          className="avatar"
          src={isLoaded && sessionUser?.profileImageUrl}
        ></img>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{sessionUser?.username}</li>
          <li>{sessionUser?.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
