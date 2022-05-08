import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists, addSongToPlaylist, getAllSongsPlaylist } from "../../../../../../store/playlists";
import {useParams} from "react-router-dom"

const PlaylistButton = ({ playlist }) => {
  const [addedToPlaylist, setAddedToPlaylist] = useState(false);
  const {songId} = useParams()
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const song = useSelector((state) => state.songs[songId])

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
