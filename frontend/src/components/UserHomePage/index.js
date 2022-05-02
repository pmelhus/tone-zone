import "./UserHomePage.css";
import Songs from "./Songs";
import Upload from "./Upload"
import Discover from "./Discover"
import { Route, Switch } from "react-router-dom";
import Song from "./Song"

const UserHomePage = (sessionUser) => {
  return (
    <div className="user-home-body">
      <Switch>
        <Route path='/discover'>
          <Discover />
        </Route>
        <Route exact path='/stream'>
          <Songs />
        </Route>
        <Route path='/upload'>
          <Upload sessionUser={sessionUser} />
        </Route>
        <Route path='/stream/:songId'>
          <Song />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHomePage;
