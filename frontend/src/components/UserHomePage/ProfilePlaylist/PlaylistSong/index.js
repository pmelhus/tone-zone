import { useState, useEffect } from "react";
import "./PlaylistSong.css";
import EditPlaylistModal from "./EditPlaylistModal";

const PlaylistSong = ({ song, user, setUrl, setTitle }) => {
  const [editModal, setEditModal] = useState(false);

  return (
    <>
      <div onClick={setUrl(song.url)}>
        <h4>
          {song?.title} by {user?.username}
        </h4>
      </div>
      <button onClick={(e) => setEditModal(true)}>Edit</button>
      <EditPlaylistModal editModal={editModal} setEditModal={setEditModal} />
    </>
  );
};

export default PlaylistSong;
