import { useState, useEffect } from "react";
import "./PlaylistSong.css";
import EditPlaylistModal from "./EditPlaylistModal";

const PlaylistSong = ({ song, user, setUrl, setTitle, url}) => {
  const [editModal, setEditModal] = useState(false);



  return (
    <>
      <div className="button-set-url">
        <button id='playlist-song' onClick={(e) => setUrl(song.url)}>
          <p>
            {song?.title} by {user?.username}
          </p>
        </button>
        <button onClick={(e) => setEditModal(true)}>Edit</button>
      </div>
      <EditPlaylistModal editModal={editModal} setEditModal={setEditModal} />
    </>
  );
};

export default PlaylistSong;
