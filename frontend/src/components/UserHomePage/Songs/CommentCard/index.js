import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../../../store/session";
import {
  createComment,
  getAllComments,
  updateComment,
} from "../../../../store/comments";
import "./CommentCard.css";

const CommentCard = ({ song }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState();
  const [hidden, setHidden] = useState(false);
  const session = useSelector((state) => state.session);
  const userId = session.user.id;
  const songId = song.id;
  const commentList = useSelector((state) => Object.values(state.comments));
  const commentListFiltered = commentList.filter(
    (comment) => comment.songId === songId
  );
  const updateBody = (e) => {
    setBody(e.target.value);
  };
  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    const payload = {
      body,
      userId,
      songId,
    };
   return dispatch(createComment(payload)).then(() => {dispatch(getAllComments())})

  }



  const handleEdit = (e, comment) => {
    const payload = {
      comment,
    };
    dispatch(updateComment(payload));
  };
  return (
    <>
      <div>
        <div className="comment-body">
          {commentListFiltered &&
            commentListFiltered.map((comment) => {
              return (
                <div hidden={hidden}>
                  <h4>{comment?.User?.username}</h4>
                  {comment.body}
                  <button
                    onClick={(e) => {
                      handleEdit(e, comment);
                    }}
                  >
                    Edit
                  </button>
                </div>
              );
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
