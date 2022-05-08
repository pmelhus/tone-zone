import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { createPlaylist } from "../../../../../store/playlists";
import "./CreatePlaylistForm";
import { ValidationError } from "../../../../../utils/validationError";
import ErrorMessage from "../../../../ErrorMessage";

const CreatePlaylistForm = ({ setShowForm, showForm, showPlaylist }) => {
  const { songId } = useParams();
  const [title, setTitle] = useState();
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs[songId]);
  const user = useSelector((state) => state.session.user);
  const [errorMessages, setErrorMessages] = useState({});

  if (!showForm) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title,
      song,
      user,
    };

    let createdPlaylist;
    try {
      createdPlaylist = await dispatch(createPlaylist(payload)).then(() =>
        setShowForm(!showForm)
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        // console.log('===================')
        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) });
    }
    //!!END
    if (createdPlaylist) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      setTitle("");

      // return dispatch(createComment(payload)).then(() => {
      //   dispatch(getAllComments());
      // });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="title-div">
          <ErrorMessage message={errorMessages.overall} />
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <ErrorMessage label={"Error"} message={errorMessages.title} />
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
