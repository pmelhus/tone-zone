import { createComment, getAllComments } from "../../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./WriteComment.css";

const WriteComment = ({ song }) => {
  const [body, setBody] = useState();
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const userId = session.user.id;
  const songId = song.id;
  const handleClick = (e) => {
    e.preventDefault();
    const payload = {
      body,
      userId,
      songId,
    };
    return dispatch(createComment(payload)).then(() => {
      dispatch(getAllComments());
    });
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };
  return (
    <div className="comment-textarea">
      <form onSubmit={(e) => handleClick(e)}>
        <textarea onChange={updateBody} value={body}>
          Write a comment!
        </textarea>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default WriteComment;
