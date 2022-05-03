import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSongs } from "../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "react-router-dom";

const Songs = () => {
  // const Player = () => (
  // <AudioPlayer
  //   autoPlay
  //   src="http://example.com/audio.mp3"
  //   onPlay={(e) => console.log("onPlay")}
  //   // other props here
  // />;
  // );
  const dispatch = useDispatch();
  const songList = useSelector((state) => Object.values(state.songs));


  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);



  return (
    <div>
      {songList && songList.map((song) => {
          return (
            <div>
              <h2>
                <Link to={`/stream/${song.id}`}>{song.title}</Link>
                <span> </span>by {song.User?.username}
              </h2>
              <p>
                {song.description}
              </p>
              <AudioPlayer
                src={song.url}
                onPlay={(e) => console.log("onPlay")}
                // other props here
              />
            </div>
          );
        })}
    </div>
  );
};

export default Songs;
