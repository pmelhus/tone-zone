import * as commentActions from "../../../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ValidationError } from "../../../../../utils/validationError";
import ErrorMessage from "../../../../ErrorMessage";
import "./Comment.css";

const Comment = ({ comment }) => {
  const [body, setBody] = useState("");
  const [hidden, setHidden] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const user = useSelector((state) => state.session.user);
  const [isShown, setIsShown] = useState(false);
  const handleEditSubmit = async (e) => {
    const payload = {
      comment,
      body,
    };

    let editedComment;
    try {
      editedComment = await dispatch(commentActions.updateComment(payload))
        .then(() => setHidden(!hidden))
        .then(() => dispatch(commentActions.getAllComments()));
    } catch (error) {
      if (error instanceof ValidationError) {
        // console.log('===================')
        setErrorMessages(error.errors);
      }

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) });
    }
    //!!END
    if (editedComment) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      setBody("");
      // dispatch(songActions.getAllSongs());
    }
    // dispatch(commentActions.updateComment(payload))
    //   .then(() => setHidden(!hidden))
    //   .then(() => dispatch(commentActions.getAllComments()));
  };

  const handleEdit = (e) => {
    setHidden(!hidden);
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };

  const handleDelete = (e) => {
    dispatch(commentActions.deleteOneComment(comment));
  };

  const commentDate = (date) => {
    const localDate = new Date(date)
    return localDate
  }
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="edit-button-div"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img src={comment?.User?.profileImageUrl}></img>
        <div className="username-body">
          <p className="username-comment">
            {comment?.User?.username === user.username
              ? "You"
              : `${comment?.User?.username}`}{" "}
          <div className='trash-time'>
            {user.id === comment.User.id && isShown && (
              <button onClick={(e) => handleDelete(e)}>
                <i class="fa-solid fa-trash"></i>
              </button>
            )}
            <p>{commentDate(comment.createdAt).toLocaleTimeString().split(' ')[0].split(':').splice(0, 2).join(':') + ' ' + commentDate(comment.createdAt).toLocaleTimeString().split(' ')[1]} on {
            commentDate(comment.createdAt).toLocaleDateString()}</p>
          </div>
          </p>
          <p className="body-comment">{comment.body}</p>
        </div>
      </div>
      <div hidden={!hidden}>
        <ErrorMessage message={errorMessages.overall} />
        <ErrorMessage label={"Error"} message={errorMessages.body} />
        <textarea onChange={updateBody} value={body}>
          {comment.body}
        </textarea>
        <button onClick={(e) => handleEditSubmit(e)}>Submit Comment</button>
        <button onClick={(e) => setHidden(!hidden)} hidden={!hidden}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default Comment;
