import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import * as sessionActions from "../../../../store/session";
import {
  createComment,
  getAllComments,
  updateComment,
} from "../../../../store/comments";
import "./CommentCard.css";
import Comment from "./Comment";

const CommentCard = ({ song }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState();

  const session = useSelector((state) => state.session);
  const userId = session.user.id;
  const songId = song.id;
  const commentList = useSelector((state) => Object.values(state.comments));
  const commentListFiltered = commentList.filter(
    (comment) => comment.songId === songId
  );

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  return (
    <>
      <p className="comment-count">
        <i class="fa-solid fa-message"></i>
        {commentListFiltered.length} comments
      </p>
      <div className="comment-content">
        <div className="comment-body">
          {commentListFiltered &&
            commentListFiltered.map((comment) => {
              return <Comment key={comment.id} comment={comment} />;
            })}
        </div>
      </div>
    </>
  );
};

export default CommentCard;
