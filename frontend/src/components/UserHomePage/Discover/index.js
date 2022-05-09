import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from "../Library/Playlists/Playlist";
import { getAllPlaylists } from "../../../store/playlists"
import { getAllSongs } from "../../../store/songs";
import "./Discover.css"
import SongDiscover from "./SongDiscover"

const Discover = () => {

  const dispatch = useDispatch();
  const playlists = useSelector((state) => Object.values(state.playlists));
  const sessionUser = useSelector((state) => state.session?.user);
  const songs = useSelector((state) => Object.values(state?.songs))
  const sortedLatest = useSelector((state) => state.songs.list)
  useEffect(() => {
    dispatch(getAllPlaylists());
    dispatch(getAllSongs());
  }, [dispatch]);

  return (
    <div className="discover-container">
      {/* <div className="playlists-container">
      <p>Hear the latest tones:</p>
        <ul className="playlist-cards">
          {sortedLatest &&
            sortedLatest.map((song) => {
                return (
                  <>
                    <li>
                      <SongDiscover song={song} />
                    </li>
                  </>
                );
            })}
        </ul>
      </div> */}

      <div className="playlists-container">
      <p>Hear the songs with the most comments:</p>
        <ul className="playlist-cards">
          {sortedLatest &&
            sortedLatest.map((song) => {
                return (
                  <>
                    <li>
                      <SongDiscover song={song} />
                    </li>
                  </>
                );
            })}
        </ul>
      </div>

      <div className="playlists-container">
      <p>Hear your own playlists:</p>
        <ul className="playlist-cards">
          {playlists &&
            playlists.map((playlist) => {
              if (playlist.userId === sessionUser.id)
                return (
                  <>
                    <li>
                      <Playlist playlist={playlist} />
                    </li>
                  </>
                );
            })}
        </ul>
      </div>

    </div>
  )
}

export default Discover
