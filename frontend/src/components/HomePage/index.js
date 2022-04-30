import ImageSlides from "./ImageSlides";
import TopLogo from "./TopLogo";
import SignIn from "./SignIn";
import SignUp from "./SignUp"
import {Redirect} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import { useState } from "react";
import * as sessionActions from "../../store/session";

const HomePage = () => {

  // if (sessionUser) {
  //   return <Redirect to="/discover" />;
  // } else {
  // if (!sessionUser) return <Redirect to='/' />
  return (
    <div className="container">
      <div className="main-content">
        <div className="top-images-container">
          <TopLogo />
          <SignIn />
          <SignUp />
          <ImageSlides />
        </div>
      </div>
    </div>
  );

};

export default HomePage;
