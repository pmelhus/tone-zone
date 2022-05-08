import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getOneSong, deleteOneSong, getAllSongs } from "../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link, useParams, useHistory } from "react-router-dom";
import EditModal from "./EditModal";
import CommentCard from "./CommentCard";
import WriteComment from "./WriteComment";
import AddToPlaylistModal from "./AddToPlaylistModal";
import { ValidationError } from "../../../utils/validationError";
import "./Song.css";

const Song = () => {
  const [signInToggle, setSignInToggle] = useState(false);
  const [playModal, setPlayModal] = useState(false);
  const dispatch = useDispatch();
  const { songId } = useParams();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const song = useSelector((state) => state.songs[songId]);
console.log(song)
  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch]);

  const handleDelete = async (e) => {
    await dispatch(deleteOneSong(song)).then(history.push("/stream"));
  };

  const openPlaylist = (e) => {
    // console.log("==============");
    // if (playModal) return
    setPlayModal(!playModal);
    // console.log(playModal);
  };

  const openMenu = (e) => {
    e.stopPropagation();
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu && playModal) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="song-content">
      {song && (
        <div>
          <div className="song-player">
            <img src={song?.imageUrl}></img>
            <h2>
              {song?.title} <br></br> {song?.User?.username}
            </h2>

            <AudioPlayer
              src={songId?.url}
              onPlay={(e) => console.log("onPlay")}
              // other props here
            />
          </div>
          <div className="comment-button-section">
            <WriteComment song={song} />
            <div className="song-buttons">
              <button
                onClick={() => setSignInToggle(!signInToggle)}
                type="button"
              >
                Edit
              </button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={(e) => openMenu(e)}>More</button>
              {showMenu && (
                <ul className="profile-dropdown">
                  <li>
                    <button onClick={(e) => openPlaylist()}>
                      add to playlist
                    </button>
                  </li>
                </ul>
              )}
            </div>
            <div className="song-description">
              <h3>Description</h3>
              <p>{song?.description}</p>
            </div>
            <CommentCard song={song} />
            <div>
              <EditModal
                title={song.title}
                description={song.description}
                visible={signInToggle}
                setVisible={setSignInToggle}
              />
            </div>
            <div>
              <AddToPlaylistModal
                playModal={playModal}
                setPlayModal={setPlayModal}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Song;
