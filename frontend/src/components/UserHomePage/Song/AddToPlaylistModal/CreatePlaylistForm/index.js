import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";

const CreatePlaylistForm = ({ setShowForm, showForm }) => {
  const { songId } = useParams();
  const [title, setTitle] = useState();
  const [errors, setErrors] = useState([]);
  const song = useSelector((state) => state.songs[songId]);
  console.log(song);
  if (!showForm) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
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
