import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import "./EditModal.css";
import {updateSong, getOneSong} from '../../../../store/song'


const EditModal = ({ propTitle, propDescription, visible, setVisible }) => {
  const [title, setTitle] = useState(propTitle);
  const [description, setDescription] = useState(propDescription);
  const [errors, setErrors] = useState([]);

  let history = useHistory();
  const dispatch = useDispatch()
const {songId} = useParams()
  const backgroundClick = () => {
    setVisible(!visible);
  };
  if (!visible) return null;



// const updateTitle = (e) => {setTitle(e.target.value)}
// const updateDescription = (e) => {setDescription(e.target.value)}

const handleSubmit = (e) => {
  e.preventDefault();

  const payload = {
    songId, title, description
  }
  dispatch(updateSong(payload))
  dispatch(getOneSong(songId))


  setVisible(!visible)

  };

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
          <div className="description-div">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
