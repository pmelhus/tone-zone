import "./UserHomePage.css";
import Songs from "./Songs";
import Upload from "./Upload"
import Discover from "./Discover"
import { Route, Switch } from "react-router-dom";

const UserHomePage = () => {
  return (
    <div className="user-home-body">
      <Switch>
        <Route path='/discover'>
          <Discover />
        </Route>
        <Route path='/stream'>
          <Songs />
        </Route>
        <Route path='/upload'>
          <Upload />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHomePage;
