import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../../store/playlists";
import {Link} from "react-router-dom"

const Playlist = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  // const playlistList = useSelector()
  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch]);

  return (
    <div>
      {playlists &&
        playlists.map((playlist) => {
          return (
            <div className="playlist-card">
              <h2>
                <Link>{playlist.title}</Link>
              </h2>
              <h3>{playlist.User.username}</h3>
            </div>
          );
        })}
    </div>
  );
};

export default Playlist;
