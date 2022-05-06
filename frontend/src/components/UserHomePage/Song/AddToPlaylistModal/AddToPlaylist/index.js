import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists, addSongToPlaylist } from "../../../../../store/playlists";
import PlaylistButton from "./PlaylistButton"

const AddToPlaylist = ({ showPlaylist, setShowPlaylist, showForm }) => {
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [addedToPlaylist, setAddedToPlaylist] = useState(false)

  // console.log(song, '=============')

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch]);



  if (!showPlaylist && showForm) return null;

  return (
    <div className="playlist-card">
      {playlists.map((playlist) => {
        if (playlist.userId === sessionUser.id)
        return (
          <>
          <PlaylistButton playlist={playlist}/>
          </>
        );
      })}
    </div>
  );
};

export default AddToPlaylist;
