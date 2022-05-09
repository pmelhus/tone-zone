import { Route, Switch, Link, NavLink } from "react-router-dom";
import ProfilePlaylists from "./ProfilePlaylists";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import ProfileTracks from "./ProfileTracks";
import ProfilePlaylist from "../ProfilePlaylist/index";
import {useState} from "react"

const ProfilePage = () => {
  const sessionUser = useSelector((state) => state.session.user);
const [proPlayLoaded, setProPlayLoaded] = useState(false)
  return (
    <>
      <div className="profile-page-main">
        {/* <h2>{sessionUser.username}</h2> */}

        <NavLink hidden={proPlayLoaded} to={`/${sessionUser.username}/tracks`}>Tracks</NavLink>
        <NavLink hidden={proPlayLoaded} to={`/${sessionUser.username}/playlists`}>Playlists</NavLink>

        <Route exact path={`/${sessionUser.username}/playlists`}>

          <ProfilePlaylists proPlayLoaded={proPlayLoaded} setProPlayLoaded={setProPlayLoaded} />
        </Route>

        <Route exact path={`/${sessionUser.username}/tracks`}>

          <ProfileTracks proPlayLoaded={proPlayLoaded} setProPlayLoaded={setProPlayLoaded}  />
        </Route>
      </div>
      <Route exact path={`/${sessionUser.username}/playlists/:id`}>
        <ProfilePlaylist proPlayLoaded={proPlayLoaded} setProPlayLoaded={setProPlayLoaded}  />
      </Route>
    </>
  );
};

export default ProfilePage;
