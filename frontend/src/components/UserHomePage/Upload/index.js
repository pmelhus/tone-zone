import "./Upload.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ValidationError } from "../../../utils/validationError";
import ErrorMessage from "../../ErrorMessage";
import * as songActions from "../../../store/song";

const Upload = (sessionUser) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [audio, setAudio] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
const updateDescription = (e) => setDescription(e.target.value)
  const updateTitle = (e) => setTitle(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
const userId = sessionUser.sessionUser.sessionUser.id
// console.log(sessionUser.sessionUser.sessionUser.id)
    const payload = {
      userId,
      title,
      description,
      audio
    };
    console.log(payload)

    return dispatch(songActions.createSong(payload))
      .then(() => {
        setTitle("");
        setDescription('');
        setAudio(null);
      })
      .then(history.push(`/stream`));
  };

  //!!END

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setAudio(file);
  };

  // const fileInput = useRef()

  return (
    <div className="upload-content">
      <form onSubmit={onSubmit}>
        <label for="song-name">Title:</label>
        <input name="song-name" value={title} onChange={updateTitle}></input>
        <label for="song-name">Description:</label>
        <input name="song-name" value={description} onChange={updateDescription}></input>
        <label for="song-upload">Upload your song:</label>
        <input
          type="file"
          name="song-upload"
          accept="audio/*"
          onChange={updateFile}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Upload;
