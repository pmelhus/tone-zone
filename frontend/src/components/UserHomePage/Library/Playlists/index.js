import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from "./Playlist";
import { getAllPlaylists } from "../../../../store/playlists";

const Playlists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session.user);
  // const playlistList = useSelector()
  useEffect(() => {
    dispatch(getAllPlaylists());
  }, [dispatch]);

  return (
    <div>
      {playlists && playlists.map((playlist) => {
        if (playlist.userId===sessionUser.id)
        return (
          <>
            <Playlist playlist={playlist} />
          </>
        );
      })}
    </div>
  );
};

export default Playlists;
