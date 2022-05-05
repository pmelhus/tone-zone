import "./AddToPlaylistModal.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CreatePlaylistForm from "./CreatePlaylistForm";
import AddToPlaylist from "./AddToPlaylist"

const AddToPlaylistModal = ({ playModal, setPlayModal }) => {
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(true)
  if (!playModal) return null;
  const backgroundClick = () => {
    setPlayModal(!playModal);
  };

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <nav>
          <Link onClick={(e) => setShowPlaylist(!showPlaylist) }>Add to playlist</Link>
          <Link onClick={(e) => setShowForm(!showForm)}>Create a playlist</Link>
        </nav>
        <AddToPlaylist setShowPlaylist={setShowPlaylist} showPlaylist={showPlaylist} />
        <CreatePlaylistForm showForm={showForm} setShowForm={setShowForm}/>
      </div>
    </div>
  );
};

export default AddToPlaylistModal;
