import { Route, Switch, Link, NavLink } from "react-router-dom";
import ProfilePlaylists from "./ProfilePlaylists";
import { useDispatch, useSelector } from "react-redux";
import "./ProfilePage.css";
import ProfileTracks from "./ProfileTracks";
import ProfilePlaylist from "../ProfilePlaylist/index";

const ProfilePage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="profile-page-main">
        <h2>{sessionUser.username}</h2>

        <NavLink to={`/${sessionUser.username}/tracks`}>Tracks</NavLink>
        <NavLink to={`/${sessionUser.username}/playlists`}>Playlists</NavLink>
        <Route exact path={`/${sessionUser.username}/playlists`}>
          <ProfilePlaylists />
        </Route>

        <Route exact path={`/${sessionUser.username}/tracks`}>
          <ProfileTracks />
        </Route>
      </div>
      <Route exact path={`/${sessionUser.username}/playlists/:id`}>
        <ProfilePlaylist />
      </Route>
    </>
  );
};

export default ProfilePage;
