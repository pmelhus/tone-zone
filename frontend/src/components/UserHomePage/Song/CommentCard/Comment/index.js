import * as commentActions from "../../../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Comment = ({ comment }) => {

  const [body, setBody] = useState()
  const [hidden, setHidden] = useState(false);
  const handleEditSubmit = (e) => {

    const payload = {
      comment,
      body
    };

    dispatch(commentActions.updateComment(payload)).then(() => setHidden(!hidden)).then(() => dispatch(commentActions.getAllComments()));
  };
  const handleEdit = (e) => {
    setHidden(!hidden);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const handleDelete = (e) => {
    dispatch(commentActions.deleteOneComment(comment))
  }

  const dispatch = useDispatch();
  return (
    <>
      <div hidden={hidden}>
        <h4>{comment?.User?.username}</h4>
        {comment.body}
        <button
          onClick={(e) => {
            handleEdit(e);
          }}
        >
          Edit
        </button>
      </div>
      <div hidden={!hidden}>
        <textarea onChange={updateBody} value={body}>{comment.body}</textarea>
        <button onClick={(e) => handleEditSubmit(e)}>Submit Comment</button>
        <button onClick={(e) => setHidden(!hidden)}hidden={!hidden}>Cancel</button>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </>
  );
};

export default Comment;
