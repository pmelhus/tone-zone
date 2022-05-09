import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import "./Library.css";
import Overview from "./Overview";
import Likes from "./Likes";
import Playlists from "./Playlists";

const Library = () => {
  return (
    <div>
        {/* <Route path="/you/library/overview">
          <Overview />
        </Route> */}
        {/* <Route path="/you/library/likes">
          <Likes />
        </Route> */}
        <Route path="/you/library/playlists">
          <Playlists />
        </Route>
    </div>
  );
};

export default Library;
