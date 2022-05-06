import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOnePlaylist,
  getAllSongsPlaylist,
  getAllPlaylists,
} from "../../../store/playlists";
import { getAllSongs } from "../../../store/songs";

const ProfilePlaylist = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const playlist = useSelector((state) => state.playlists[id]);
  const sessionUser = useSelector((state) => state.session.user);

  // const songs = Object.values(playlist)

  console.log(playlist, "===========");
  useEffect(() => {
    dispatch(getAllPlaylists());
    dispatch(getOnePlaylist(id));
    dispatch(getAllSongsPlaylist(id));
  }, [dispatch]);

  const handleEdit = () => {};

  return (
    <>
      <div>
        <h2>{playlist && playlist?.title}</h2>
        <h2>{playlist && playlist?.User?.username}</h2>
      </div>
      {/* <div>
        {songs.map((song) => {
          return (
            <>
              <p>{song?.title}</p>
              <button onClick={(e) => handleEdit()}>Edit</button>

            </>
          )
        })}
      </div> */}
    </>
  );
};

export default ProfilePlaylist;
