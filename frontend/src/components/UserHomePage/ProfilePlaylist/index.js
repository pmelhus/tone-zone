import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOnePlaylist,
  getAllSongsPlaylist,
  getAllPlaylists,
  deleteOnePlaylist,
} from "../../../store/playlists";
import { getAllSongs } from "../../../store/songs";

const ProfilePlaylist = ({ proPlayLoaded, setProPlayLoaded }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlists[id]);
  const sessionUser = useSelector((state) => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const pSongs = useSelector((state) => state.playlists[id]);
  // const songs = Object.values(pSongs)
  // console.log(pSongs.Songs, "===========?!?!?!?!?");
  useEffect(() => {
    setProPlayLoaded(true);
    // dispatch(getAllPlaylists());
    dispatch(getOnePlaylist(id));
    setIsLoaded(true);
    // dispatch(getAllSongsPlaylist(id));
  }, [dispatch]);

  const handlePlaylistDelete = () => {
    // console.log(playlist)
    dispatch(deleteOnePlaylist(playlist));
  };

  const openMenu = (e) => {
    // e.stopPropagation();
    setShowMenu(!showMenu);
    if (!showMenu) return;
  };

  return (
    <>
      <div>
        <h2>{playlist && playlist?.title}</h2>
        <h2>{playlist && playlist?.User?.username}</h2>
        <button onClick={(e) => openMenu()}>More</button>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <button onClick={(e) => handlePlaylistDelete()}>
                Delete Playlist
              </button>
            </li>
          </ul>
        )}
      </div>
      <div>
        {isLoaded &&
          pSongs?.Songs?.map((song) => {
            return (
              <>
                <p>{song?.title}</p>
              </>
            );
          })}
      </div>
    </>
  );
};

export default ProfilePlaylist;
