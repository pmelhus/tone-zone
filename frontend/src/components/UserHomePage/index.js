import "./UserHomePage.css";
import Songs from "./Songs";
import Upload from "./Upload";
import Discover from "./Discover";
import { Route, Switch, Link, NavLink } from "react-router-dom";
import Song from "./Song";
import Library from "./Library";

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
            <Link to="/you/library/overview">Overview</Link>
            <Link to="/you/library/likes">Likes</Link>
            <Link to="/you/library/playlists">Playlists</Link>
          </nav>
          <Library />
        </Route>
        <Route path="/upload">
          <Upload sessionUser={sessionUser} />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHomePage;
