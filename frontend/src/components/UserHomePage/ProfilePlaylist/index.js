import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOnePlaylist,
  getAllSongsPlaylist,
  getAllPlaylists,
  deleteOnePlaylist,
} from "../../../store/playlists";
import PlaylistSong from "./PlaylistSong";
import AudioPlayer from "react-h5-audio-player";

const ProfilePlaylist = ({ proPlayLoaded, setProPlayLoaded }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlists[id]);
  const sessionUser = useSelector((state) => state?.session.user);

  const user = useSelector((state) => state?.playlists[id]?.User);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const songs = useSelector((state) => state?.playlists[id]?.Songs);
  const [title, setTitle] = useState(songs?.title);
  const [url, setUrl] = useState(songs?.url);

  // console.log(playlist?.Songs, "==================");
  // const songs = Object.values(pSongs)
  // console.log(pSongs.Songs, "===========?!?!?!?!?");
  useEffect(() => {
    setProPlayLoaded(true);
    // dispatch(getAllPlaylists());
    dispatch(getOnePlaylist(id));
    // setTitle(playlist?.Songs?.title);
    setIsLoaded(true);
    // dispatch(getAllSongsPlaylist(id));
  }, [dispatch]);
  if (!playlist) return null

  const handlePlaylistDelete = () => {
    // console.log(playlist)
    dispatch(deleteOnePlaylist(playlist));
  };

  const openPlaylist = (e) => {
    // console.log("==============");
    // if (playModal) return
    setEditModal(!editModal);
    // console.log(playModal);
  };

  const openMenu = (e) => {
    // e.stopPropagation();
    setShowMenu(!showMenu);
    if (!showMenu) return;
  };

  return (
    <>
      <div>
        {isLoaded && (
          <>
            <h2>{playlist && playlist?.title}</h2>
            <h2>{playlist && playlist?.User?.username}</h2>
            <h3>Song Title: {title}</h3>
          </>
        )}

        <AudioPlayer
          src={url}
          onPlay={(e) => console.log("onPlay")}
          // other props here
        />
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
          playlist?.Songs?.map((song) => {
            return (
              <>
                <PlaylistSong
                  song={song}
                  user={user}
                  setUrl={setUrl}
                  setTitle={setTitle}
                />
              </>
            );
          })}
      </div>
    </>
  );
};

export default ProfilePlaylist;
