import ImageCarousel from "./ImageCarousel";
import TopLogo from "./TopLogo";
import SignIn from "./SignIn";
import SignUp from "./SignUp"
import {Redirect} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import { useState } from "react";
import * as sessionActions from "../../store/session";

const HomePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/discover" />;
  return (
    <div className="container">
      <div className="main-content">
        <div className="top-images-container">
          <TopLogo />
          <SignIn />
          <SignUp />
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
