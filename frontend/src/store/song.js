import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "songs/ADD_ONE";

const LOAD = "songs/LOAD";

const addOneSong = (song) => ({
  type: ADD_ONE,
  song,
});

const load = (list) => ({
  type: LOAD,
  list,
});

export const getSongs = () => async (dispatch) => {
  const response = await fetch(`/api/songs`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createSong = (song) => async (dispatch) => {
  const { userId, title, audio } = song;
  const formData = new FormData();
  formData.append('userId', userId)
  formData.append("title", title);
  if (audio) formData.append("audio", audio);
  try {
    const response = await csrfFetch(`/api/songs/`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
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
          // Check if the error is JSON, i.e., from the Pokemon server. If so,
          // don't throw error yet or it will be caught by the following catch
          errorJSON = JSON.parse(error);
        } catch {
          // Case if server could not be reached
          throw new Error(error);
        }
        throw new Error(`${errorJSON.title}: ${errorJSON.message}`);
      }
    }

    const song = await response.json();
    dispatch(addOneSong(song));
  } catch (error) {
    throw error;
  }
};

const initialState = {
  list: [],
  types: [],
};

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE:
      if (!state[action.song.id]) {
        const newState = {
          ...state,
          [action.song.id]: action.song,
        };
        const songList = newState.list.map((id) => newState[id]);
        songList.push(action.song);
        // newState.list = sortList(pokemonList);
        return newState;
      }
    default:
      return state;
  }
};

export default songReducer;
