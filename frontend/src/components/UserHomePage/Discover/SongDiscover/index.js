import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSongs } from "../../../../store/songs";
import { Link } from "react-router-dom";
import "./SongDiscover.css";



const SongDiscover = ({ song }) => {
  return (
    <div className="playlist-card">
      <img className="playlist-image" src={song.imageUrl}></img>
      <Link to={`/stream/${song.id}`}>
        <p>{song?.title}</p>
      </Link>
      <p>{song?.User?.username}</p>
    </div>
  );
};

export default SongDiscover;
