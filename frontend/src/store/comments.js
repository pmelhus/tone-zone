import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "comments/ADD_ONE";
const UPDATE = "comments/UPDATE";
const DELETE = "comments/DELETE";
const LOAD = "comments/LOAD";

const addOneComment = (comment, user) => ({
  type: ADD_ONE,
  comment,
  user,
});

const getComments = (comments) => ({
  type: LOAD,
  comments,
});

const update = (comment) => ({
  type: UPDATE,
  comment,
});

const deleteComment = (comment) => ({
  type: DELETE,
  comment,
});

export const createComment = (comment) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          errorJSON = JSON.parse(error);
        } catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const commentRes = await response.json();

    dispatch(addOneComment(commentRes, commentRes.user));
  } catch (error) {
    throw error;
  }
};

export const getAllComments = () => async (dispatch) => {
  // console.log('================')
  const res = await fetch("/api/comments");
  if (res.ok) {
    const comments = await res.json();
    // console.log(list)
    // console.log(data)
    dispatch(getComments(comments));
  } else {
    throw res;
  }
};

export const updateComment = (data) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/comments/${data.comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let error;
      if (response.status === 422) {
        error = await response.json();
        throw new ValidationError(error.errors, response.statusText);
      } else {
        let errorJSON;
        error = await response.text();
        try {
          errorJSON = JSON.parse(error);
        } catch {
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }
    const comment = await response.json();
    dispatch(update(comment));
  } catch (error) {
    throw error;
  }
};

export const deleteOneComment = (data) => async (dispatch) => {
  console.log(data);
  const response = await csrfFetch(`/api/comments/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const comment = await response.json();

  dispatch(deleteComment(comment));
};

const initialState = {};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE: {
      // console.log(action.user)
      const newState = {
        ...state,
        [action.comment.id]: { ...action.comment, User: action.user },
      };

      // const songList = newState.songs.map((song) => newState[song.id]);
      // songList.push(action.song);
      // newState.list = sortList(pokemonList);
      return newState;
    }
    case LOAD: {
      const newState = { ...state };
      action.comments.forEach((comment) => (newState[comment.id] = comment));
      return newState;
    }

    case DELETE: {
      delete state[action.comment.id];
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
};

export default commentReducer;
