import "./AddToPlaylistModal.css";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../store/playlists";
import CreatePlaylistForm from "./CreatePlaylistForm";
import AddToPlaylist from "./AddToPlaylist";

const AddToPlaylistModal = ({ playModal, setPlayModal }) => {
  const [errors, setErrors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const history = useHistory();

  if (!playModal) return null;
  const backgroundClick = () => {
    setPlayModal(!playModal);
  };

  const goToPlaylist = () => {
    history.push("/you/library/playlists");
  };

  return (
    <div
      className="background-modal"
      onClick={(e) => {
        backgroundClick();
      }}
    >
      <div className="modal" id="playlist-modal" onClick={(e) => e.stopPropagation()}>
        <nav>
          <h3>
            <button
              onClick={(e) => {
                setShowPlaylist(!showPlaylist);
                setShowForm(!showForm);
              }}
              disabled={showPlaylist}
            >
              Add to playlist
            </button>
          </h3>
          <h3>
            <button
              onClick={(e) => {
                setShowForm(!showForm);
                setShowPlaylist(!showPlaylist);
              }}
              disabled={showForm}
            >
              Create a playlist
            </button>
          </h3>
        </nav>
        <AddToPlaylist
          setShowPlaylist={setShowPlaylist}
          showPlaylist={showPlaylist}
          showForm={showForm}
          setShowForm={setShowForm}
        />
        <CreatePlaylistForm
          showForm={showForm}
          setShowForm={setShowForm}
          setShowPlaylist={setShowPlaylist}
          showPlaylist={showPlaylist}
        />

      </div>
    </div>
  );
};

export default AddToPlaylistModal;
