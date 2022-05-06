import { useDispatch, useSelector } from "react-redux";
import "react-h5-audio-player/lib/styles.css";
import { useState, useEffect } from "react";
import { getAllSongs, deleteOneSong } from "../../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "react-router-dom";

const ProfileTracks = ({ proPlayLoaded, setProPlayLoaded }) => {

  const dispatch = useDispatch();
  const songList = useSelector((state) => Object.values(state.songs));
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    setProPlayLoaded(false);
    dispatch(getAllSongs());
  }, [dispatch]);
  return (
    <div className="songs-content">
    {songList &&
      songList.map((song) => {
          if (song.userId === sessionUser.id)
        return (
          <div className="song-card">
            <div className="text-content">
              <h2>
                <Link to={`/stream/${song.id}`}>{song.title}</Link>
                <span> </span>by {song.User?.username}
              </h2>
              <p>{song.description}</p>
            </div>
            <AudioPlayer
              className="audio-player"
              src={song.url}
              onPlay={(e) => console.log("onPlay")}
              // other props here
            />
          </div>
        );
      })}
  </div>

  )
}

export default ProfileTracks
