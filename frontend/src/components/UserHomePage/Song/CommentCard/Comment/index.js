import * as commentActions from "../../../../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ValidationError } from "../../../../../utils/validationError";
import ErrorMessage from "../../../../ErrorMessage";

const Comment = ({ comment }) => {
  const [body, setBody] = useState('');
  const [hidden, setHidden] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});


  const handleEditSubmit = async (e) => {
    const payload = {
      comment,
      body,
    };

    let editedComment;
    try {
      
      editedComment = await  dispatch(commentActions.updateComment(payload))
      .then(() => setHidden(!hidden))
      .then(() => dispatch(commentActions.getAllComments()));
    } catch (error) {
      if (error instanceof ValidationError) {
        // console.log('===================')
        setErrorMessages(error.errors)}

      // If error is not a ValidationError, add slice at the end to remove extra
      // "Error: "
      else setErrorMessages({ overall: error.toString().slice(7) });
    }
    //!!END
    if (editedComment) {
      //!!START SILENT
      setErrorMessages({});
      //!!END
      setBody('')
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
      <ErrorMessage message={errorMessages.overall} />
      <ErrorMessage
          label={"Error"}
          message={errorMessages.body}
        />
        <textarea onChange={updateBody} value={body}>
          {comment.body}
        </textarea>
        <button onClick={(e) => handleEditSubmit(e)}>Submit Comment</button>
        <button onClick={(e) => setHidden(!hidden)} hidden={!hidden}>
          Cancel
        </button>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </>
  );
};

export default Comment;
