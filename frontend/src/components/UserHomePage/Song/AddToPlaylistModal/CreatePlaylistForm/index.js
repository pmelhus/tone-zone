import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import {createPlaylist} from "../../../../../store/playlists"
import "./CreatePlaylistForm"

const CreatePlaylistForm = ({ setShowForm, showForm, showPlaylist}) => {
  const { songId } = useParams();
  const [title, setTitle] = useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch()
  const song = useSelector((state) => state.songs[songId]);
  const user = useSelector((state) => state.session.user)

  if (!showForm && showPlaylist) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title, song, user
    }
    dispatch(createPlaylist(payload))
    setShowForm(!showForm)
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className="title-div">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <h2>
            {song?.title} - {song?.User.username}
          </h2>
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </>
  );
};

export default CreatePlaylistForm;
