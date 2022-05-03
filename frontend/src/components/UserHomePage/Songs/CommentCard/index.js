
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CommentCard = () => {

  const [comment, setComment] = useState()
  
  const handleClick = (e) => {
    e.preventDefault();

  };
  return (
    <>
    <div>
      <form onSubmit={(e) => handleClick()}>
        <textarea>Write a comment!</textarea>
      </form>
    </div>
    </>
  );
};

export default CommentCard
