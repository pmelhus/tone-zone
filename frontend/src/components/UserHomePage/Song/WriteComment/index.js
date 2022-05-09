import { createComment, getAllComments } from "../../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import "./WriteComment.css";
import { ValidationError } from "../../../../utils/validationError";
import ErrorMessage from "../../../ErrorMessage";

const WriteComment = ({ song }) => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const userId = session.user.id;
  const songId = song.id;
  const [errorMessages, setErrorMessages] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
    const payload = {
      body,
      userId,
      songId,
    };
    let createdComment;
    try {
      createdComment = await dispatch(createComment(payload)).then(() =>
        dispatch(getAllComments())
      );
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
    if (createdComment) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      setBody("");
      // return dispatch(createComment(payload)).then(() => {
      //   dispatch(getAllComments());
      // });
    }
  };

  const updateBody = (e) => {
    setBody(e.target.value);
  };
  return (
    <>
      <ErrorMessage message={errorMessages.overall} />
      <div className="comment-textarea">
        <form onSubmit={(e) => handleClick(e)}>
          <img
            className="comment-avatar"
            src={session.user.profileImageUrl}
          ></img>
          <div className="comment-body-text">
            <textarea
              placeholder="Write a comment"
              onChange={updateBody}
              value={body}
            ></textarea>
          </div>
          <button>Submit</button>
        </form>
      </div>
      <ErrorMessage
        className="error-message"
        label={"Error"}
        message={errorMessages.body}
      />
    </>
  );
};

export default WriteComment;
