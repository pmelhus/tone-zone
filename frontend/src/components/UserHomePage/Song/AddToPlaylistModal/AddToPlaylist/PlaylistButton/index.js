import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists, addSongToPlaylist } from "../../../../../../store/playlists";


const PlaylistButton = ({ playlist }) => {
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const song = useSelector((state) => Object.values(state.songs)[0])
  const addSongPlaylist = (playlist) => {
    const payload = {song, playlist}
    dispatch(addSongToPlaylist(payload))
  setAddedToPlaylist(true)

  }
//   useEffect(() => {
// if (playlists.find(playlist2 => playlist2.Songs[song.id] === song.id))
//  setAddedToPlaylist(true)
//   }, [addedToPlaylist])
  return (
    <>
      <div>{playlist.title}</div>
      <button
        disabled={addedToPlaylist}
        onClick={(e) => addSongPlaylist(playlist)}
      >
        Add to playlist
      </button>
    </>
  );
};

export default PlaylistButton
