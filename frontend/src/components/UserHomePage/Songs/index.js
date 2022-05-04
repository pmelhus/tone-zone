import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getAllSongs, deleteOneSong } from "../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link } from "react-router-dom";
import CommentCard from "./CommentCard";
import "./Songs.css"


const Songs = ({sessionUser}) => {
  const dispatch = useDispatch();
  const songList = useSelector((state) => Object.values(state.songs));

  useEffect(() => {
    dispatch(getAllSongs())
  }, [dispatch]);



  const handleSubmit = async (e, song) => {
    e.preventDefault();
    await dispatch(deleteOneSong(song)).then();
  };
  return (
    <div className='songs-content'>
      {songList &&
        songList.map((song) => {
          return (
            <div className='song-card'>
              <div className='text-content'>
              <h2>
                <Link to={`/stream/${song.id}`}>{song.title}</Link>
                <span> </span>by {song.User?.username}
              </h2>
              <p>{song.description}</p>
              </div>
              <AudioPlayer className='audio-player'
                src={song.url}
                onPlay={(e) => console.log("onPlay")}
                // other props here
              />

              <CommentCard song={song} sessionUser={sessionUser} className='comment-card' />
              <form
                onSubmit={(e) => {
                  handleSubmit(e, song);
                }}
              >
                <button>Delete</button>
              </form>
            </div>
          );
        })}
    </div>
  );
};

export default Songs;
