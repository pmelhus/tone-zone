import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllSongsPlaylist, updatePlaylist, getOnePlaylist, deleteOneSong } from "../../../../../store/playlists";

const EditPlaylistModal = ({ editModal, setEditModal }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const songs = useSelector(state => state.playlists[id]?.Songs)
  const [title, setTitle] = useState('');
  const playlist = useSelector(state => state.playlists[id])
  const [isLoaded, setIsLoaded] = useState(false)

  const backgroundClick = () => {
    setEditModal(!editModal);
  };

  const handleEdit = () => {
    const payload = {
      id, title
    }
    dispatch(updatePlaylist(payload))
    dispatch(getOnePlaylist(id))
  }

  const deleteSong = (song,playlist) => {
    const payload = {song, playlist}
    dispatch(deleteOneSong(payload))
    dispatch(getAllSongsPlaylist(id))
  }


  useEffect(() => {
    dispatch(getAllSongsPlaylist(id))
    setIsLoaded(true)
  }, [dispatch]);

  if (!editModal) return null;

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation(e)}>

          <label name="title"> Edit title</label>
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)}></input>
          <button onClick={(e) => handleEdit()}>Submit edit</button>
          <div>
            {isLoaded && songs?.map(song => {
              return (
                <>
                <h4>{song.title}</h4>
                <button onClick={ (e) => deleteSong(song, playlist)}>Delete song</button>
                </>
              )
            })}
          </div>

      </div>
    </div>
  );
};

export default EditPlaylistModal;
