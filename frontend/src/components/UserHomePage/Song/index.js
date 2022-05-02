import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect} from "react";
import { getOneSong } from "../../../store/song";
import AudioPlayer from "react-h5-audio-player";
import { Link, useParams} from "react-router-dom";

const Song = () => {
  // const Player = () => (
  // <AudioPlayer
  //   autoPlay
  //   src="http://example.com/audio.mp3"
  //   onPlay={(e) => console.log("onPlay")}
  //   // other props here
  // />;
  // );
  const dispatch = useDispatch();
  const {songId} = useParams()
  const song = useSelector((state)=> state.song[songId])
console.log(`=============${song}`)
  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch]);

  return (

            <div>
              <h2>
              {song.User?.username}
              </h2>
              <AudioPlayer
                src={song.url}
                onPlay={(e) => console.log("onPlay")}
                // other props here
              />
            </div>
          );
  }

export default Song;
