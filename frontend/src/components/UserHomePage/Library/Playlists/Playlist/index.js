import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllPlaylists } from "../../../../../store/playlists";
import { Link } from "react-router-dom";

const Playlist = ({ playlist }) => {

  return (
    <div className="playlist-card">
      <h2>
        <Link to={`/${playlist.User.username}/playlists/${playlist.id}`}>{playlist?.title}</Link>
      </h2>
      <h3>{playlist?.User.username}</h3>
    </div>
  );
};

export default Playlist;
