import "./Upload.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { ValidationError } from "../../../utils/validationError";
import ErrorMessage from "../../ErrorMessage";
import * as songActions from "../../../store/songs";

const Upload = (sessionUser) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const [errorMessages, setErrorMessages] = useState({});
  const [audio, setAudio] = useState(null);
  const [image, setImage] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);
  const userId = useSelector((state) => state.session.user.id);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    // console.log(sessionUser.sessionUser.sessionUser.id)

    const payload = {
      userId,
      title,
      description,
      audio,
      image,
      files: [audio, image],
    };
    // console.log(files)
    let createdSong;
    try {
      createdSong = await dispatch(songActions.createSong(payload))
        .then(() => history.push(`/stream`))
        .then(() => dispatch(songActions.getAllSongs()));
    } catch (error) {
      console.log(payload);
      if (error instanceof ValidationError) {
        // console.log('===================')
        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) });
    }
    //!!END
    if (createdSong) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      setTitle("");
      setDescription("");
      setAudio(null);
      history.push(`/stream`);
      dispatch(songActions.getAllSongs());
    }
  };

  //!!END

  const updateAudio = (e) => {
    const file = e.target.files[0];

    if (file) setAudio(file);
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
    console.log(e.target.files, "FILE HEREEEE");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    //!!START SILENT
    setErrorMessages({});
    //!!END

    history.push.goBack();
  };

  // const fileInput = useRef()

  return (
    <div className="upload-content">
      <ErrorMessage message={errorMessages.overall} />
      <form onSubmit={onSubmit}>
        <label for="song-name">Title</label>
        <input
          name="song-name"
          placeholder="Name your track"
          value={title}
          onChange={updateTitle}
          type="text"
          min={2}
          required
        ></input>
        <ErrorMessage label={"title"} message={errorMessages.title} />
        <label for="song-description">Description</label>
        <textarea
          type="text"
          placeholder="Describe your track"
          name="song-description"
          value={description}
          onChange={updateDescription}
          required
        ></textarea>
        <ErrorMessage
          label={"description"}
          message={errorMessages.description}
        />
        <label for="song-upload">Upload your song:</label>

        <input
          placeholder="Upload your file"
          type="file"
          name="song-upload"
          accept="audio/*"
          onChange={updateAudio}
          required
        ></input>

        <label for="song-upload">Upload song cover</label>

          <input
            placeholder="Upload your image"
            type="file"
            accept="image/*"
            name="image-upload"
            onChange={updateImage}
          ></input>

        <ErrorMessage label={"Upload your file"} message={errorMessages.file} />
        <button>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Upload;
