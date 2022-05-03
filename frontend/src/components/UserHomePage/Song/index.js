import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getOneSong, deleteOneSong } from "../../../store/song";
import AudioPlayer from "react-h5-audio-player";
import { Link, useParams, useHistory } from "react-router-dom";
import EditModal from "./EditModal";
const Song = () => {
  // const Player = () => (
  // <AudioPlayer
  //   autoPlay
  //   src="http://example.com/audio.mp3"
  //   onPlay={(e) => console.log("onPlay")}
  //   // other props here
  // />;
  // );
  const [signInToggle, setSignInToggle] = useState(false);
  const dispatch = useDispatch();
  const { songId } = useParams();
  const song = useSelector((state) => state.song[songId]);
  const history = useHistory()
  useEffect(() => {
    dispatch(getOneSong(songId));
  }, [dispatch, song]);


  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(deleteOneSong(song)).then(
      history.push('/stream')
    )
  }
  return (
    <div>
      <h2>
        {song.title} by {song.User?.username}
      </h2>
      <p>{song.description}</p>
      <AudioPlayer
        src={song.url}
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
      <button>
        Delete
      </button>
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
  );
};

export default Song;
