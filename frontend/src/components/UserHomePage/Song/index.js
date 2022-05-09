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
  const user = useSelector((state) => state.session.user);
  // console.log(song);
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
    setShowMenu(!showMenu);
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
        <>
          <div
            className="audio-and-image"
            style={{ backgroundImage: `url("${song.imageUrl}")` }}
          >
            <div className="song-player">
              <div className="title-song-player-rel">
                <div className="title-song-player">
                  <p id="title-p">{song?.title}</p>
                  <p id="username-p">{song?.User?.username}</p>
                </div>
              </div>

              <AudioPlayer
                className="audio-player"
                src={song?.url}
                onPlay={(e) => console.log("onPlay")}
                style={{ backgroundImage: `url("${song.imageUrl}")` }}
              />

              <div className="img-div">
                <img src={song?.imageUrl}></img>
              </div>
            </div>
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
              {user.id === song.User.id && (
                <button onClick={handleDelete}>Delete</button>
              )}
              <div className="dropdown-more">
                <button onClick={(e) => openMenu(e)}>
                  <i class="fa-solid fa-ellipsis"></i>More
                </button>
                {showMenu && (
                  <div
                    className="profile-dropdown"
                    onClick={(e) => openPlaylist()}
                  >
                    <a>add to playlist</a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="avatar-comment-description">
            <div className="song-page-avatar">
              <img src={song.User.profileImageUrl}></img>
              <p>{song.User.username}</p>
            </div>
            <div className="comment-body-description">
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
        </>
      )}
    </div>
  );
};

export default Song;
