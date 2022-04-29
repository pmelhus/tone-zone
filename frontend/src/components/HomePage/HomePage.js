import ImageCarousel from "./ImageCarousel";
import TopLogo from "./TopLogo";
import SignUp from "./SignUp";
import "./HomePage.css";
import { useState } from "react";
const HomePage = () => {
  return (
    <div className="container">
      <div className="main-content">
        <div className="top-images-container">
          <TopLogo />
          <SignUp />
          <ImageCarousel />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
