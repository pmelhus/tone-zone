import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getOneSong, deleteOneSong, getAllSongs } from "../../../store/songs";
import AudioPlayer from "react-h5-audio-player";
import { Link, useParams, useHistory } from "react-router-dom";
import EditModal from "./EditModal";
const Song = () => {
  const [signInToggle, setSignInToggle] = useState(false);
  const dispatch = useDispatch();
  const { songId } = useParams();
  console.log(songId);
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch]);

  const song = useSelector((state) => state.songs[songId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteOneSong(song)).then(history.push("/stream"));
  };
  return (
    <>
      {song && (
        <div>
          <h2>
            {song?.title} by {song?.User?.username}
          </h2>
          <p>{song?.description}</p>
          <AudioPlayer
            src={song?.url}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
          <button
            onClick={() => setSignInToggle(!signInToggle)}
            className="edit-button"
            type="button"
          >
            Edit
          </button>
          <form onSubmit={handleSubmit}>
            <br></br>
            <button>Delete</button>
          </form>
          <div>
            <EditModal
              title={song.title}
              description={song.description}
              visible={signInToggle}
              setVisible={setSignInToggle}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Song;
