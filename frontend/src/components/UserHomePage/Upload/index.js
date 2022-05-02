import "./Upload.css";
import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import {useHistory} from "react-router-dom"
import {ValidationError} from "../../../utils/validationError"
import ErrorMessage from '../../ErrorMessage';
import {createSong} from "../../../store/song"
import S3 from "react-aws-s3"

const Upload = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch()
  const history = useHistory()
  const [errorMessages, setErrorMessages] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);


  const updateTitle = (e) => setTitle(e.target.value);



  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title
    };
    let createdSong;
    try {
      createdSong = dispatch(createSong(payload));
    } catch (error) {
      if (error instanceof ValidationError) setErrorMessages(error.errors);
      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) })
    }
    //!!END
    if (createdSong) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      history.push(`/discovery`);
    }
  };


// const fileInput = useRef()


  return (
    <div className="upload-content">
      <form onSubmit={onSubmit}>
        <label for="song-name">Title:</label>
        <input name="song-name" value={title} onChange={updateTitle}></input>
        <label for="song-upload">Upload your song:</label>
        <input
          type="file"
          name="song-upload"
          accept="audio/*"
        ></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Upload;
