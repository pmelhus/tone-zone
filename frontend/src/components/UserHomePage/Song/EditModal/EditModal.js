import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

const EditModal = ({ visible, setVisible }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState()
  const [errors, setErrors] = useState([]);

  let history = useHistory()

  const backgroundClick = () => {
    setVisible(!visible);
  };
  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    
  }



  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}></div>
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
  );
};

export default EditModal
