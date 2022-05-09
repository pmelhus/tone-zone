import "./UserHomePage.css";
import Songs from "./Songs";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import Discover from "./Discover";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import Song from "./Song";
import Library from "./Library";
import ProfilePage from "./ProfilePage";
import {restoreUser} from '../../store/session'
import {useEffect} from "react"

// howler.js range i
const UserHomePage = (sessionUser) => {


  return (
    <div className="user-home-body">
      <Switch>
        <Route path="/discover">
          <Discover />
        </Route>
        <Route path="/stream/:songId">
          <Song />
        </Route>
        <Route exact path="/stream">
          <Songs sessionUser={sessionUser} />
        </Route>
        <Route path="/you/library">
          <nav className="library-nav">
            {/* <Link to="/you/library/overview">Overview</Link> */}
            {/* <Link to="/you/library/likes">Likes</Link> */}
            <Link to="/you/library/playlists">Playlists</Link>
          </nav>
          <Library />
        </Route>
        <Route path="/upload">
          <Upload sessionUser={sessionUser} />
        </Route>
        <Route path="/:username">
          <ProfilePage />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHomePage;
