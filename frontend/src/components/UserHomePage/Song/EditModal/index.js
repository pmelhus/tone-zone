import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./EditModal.css";
import { updateSong, getOneSong } from "../../../../store/songs";
import { ValidationError } from "../../../../utils/validationError";
import ErrorMessage from "../../../ErrorMessage";

const EditModal = ({ propTitle, propDescription, visible, setVisible }) => {
  const [title, setTitle] = useState(propTitle);
  const [description, setDescription] = useState(propDescription);
  const [errors, setErrors] = useState([]);
  const [errorMessages, setErrorMessages] = useState({});

  let history = useHistory();
  const dispatch = useDispatch();
  const { songId } = useParams();

  const backgroundClick = () => {
    setVisible(!visible);
  };
  if (!visible) return null;

  // const updateTitle = (e) => {setTitle(e.target.value)}
  // const updateDescription = (e) => {setDescription(e.target.value)}

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      songId,
      title,
      description,
    };

    let editedSong;
    try {
      editedSong = await dispatch(updateSong(payload)).then(() =>
        dispatch(getOneSong(songId))
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
    if (editedSong) {
      //!!START SILENT
      setErrorMessages({});
      dispatch(getOneSong(songId));
      setVisible(!visible);
    }
  };

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <ErrorMessage message={errorMessages.overall} />
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
            <ErrorMessage label={"title"} message={errorMessages.title} />
          </div>
          <div className="description-div">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <ErrorMessage
              label={"description"}
              message={errorMessages.description}
            />
          </div>
          <button type="submit">Submit Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
