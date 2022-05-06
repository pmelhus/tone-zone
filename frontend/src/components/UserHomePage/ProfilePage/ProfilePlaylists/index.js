import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../store/playlists";
import { Link } from "react-router-dom";
import "./ProfilePlaylists.css";

const ProfilePlaylists = ({ proPlayLoaded, setProPlayLoaded }) => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    setProPlayLoaded(false);
    dispatch(getAllPlaylists());
  }, [dispatch]);
  return (
    <>
      <div className="playlist-card">
        {playlists.map((playlist) => {
          if (playlist.userId === sessionUser.id)
            return (
              <div className="playlist-div">
                <h2>
                  <Link
                    to={`/${sessionUser.username}/playlists/${playlist.id}`}
                  >
                    {playlist.title}
                  </Link>
                </h2>
                <h3>{playlist.User.username}</h3>
              </div>
            );
        })}
      </div>
    </>
  );
};

export default ProfilePlaylists;
