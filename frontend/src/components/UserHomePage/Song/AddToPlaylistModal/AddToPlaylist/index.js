import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists, addSongToPlaylist } from "../../../../../store/playlists";

const AddToPlaylist = ({ showPlaylist, setShowPlaylist, showForm }) => {
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const song = useSelector((state) => Object.values(state.songs)[0])

  // console.log(song, '=============')

  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch]);

const addSongPlaylist = (playlist) => {
  const payload = {song, playlist}
  dispatch(addSongToPlaylist(payload))
}

  if (!showPlaylist && showForm) return null;

  return (
    <div className="playlist-card">
      {playlists.map((playlist) => {
        return (
          <>
            <div>{playlist.title}</div>
            <button onClick={(e) => addSongPlaylist(playlist)}>Add to playlist</button>
          </>
        );
      })}
    </div>
  );
};

export default AddToPlaylist;
