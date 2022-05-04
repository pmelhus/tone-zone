import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../../../store/session";
import { createComment, getAllComments } from "../../../../store/comments";

const CommentCard = ({ song }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState();
  const session = useSelector((state) => state.session);
  const userId = session.user.id;
  const songId = song.id;
  const commentList = useSelector((state) => Object.values(state.comments));
  const commentListFiltered = commentList.filter(comment => comment.songId === songId);
  const updateBody = (e) => {
    setBody(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    const payload = {
      body,
      userId,
      songId,
    };
    dispatch(createComment(payload))
    dispatch(getAllComments())

  };
  return (
    <>
      <div>
        <div>
          {commentListFiltered &&
            commentList.map((comment) => {
              return(
              <div className="comment-body">
                {comment.body}
              </div>
              )
            })}
        </div>
        <form onSubmit={(e) => handleClick(e)}>
          <textarea onChange={updateBody} value={body}>
            Write a comment!
          </textarea>
          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default CommentCard;
