import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "songs/ADD_ONE";
const LOAD = "songs/LOAD";

const addOneSong = (song) => ({
  type: ADD_ONE,
  song,
});

const getSongs = (songs) => ({
  type: LOAD,
  songs
});

export const getAllSongs = () => async (dispatch) => {
  const res = await fetch("/api/songs");
  if (res.ok) {
    const songs = await res.json();
    // console.log(list)
    // console.log(data)
    dispatch(getSongs(songs));
  } else {
    throw res;
  }
};

export const getOneSong = (id) => async (dispatch) => {
  const response = await fetch(`/api/songs/${id}`);

  if (response.ok) {
    console.log(response);
    const song = await response.json();
    dispatch(addOneSong(song));
  }
};

export const createSong = (song) => async (dispatch) => {
  const { userId, title, description, audio } = song;
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("title", title);
  formData.append("description", description);
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
// songs: []
};

// const sortList = (list) => {
//   return list.sort((songA, songB) => {
//     return songA.id - songB.id;
//   }).map((song) => song.id);
// };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
        const newState = {...state}
        action.songs.forEach((song) => (newState[song.id] = song));
        return newState

    case ADD_ONE:
      if (!state[action.song.id]) {
        console.log(state + '=================')
        const newState = {
          ...state,
          [action.song.id]: action.song.song
        };
        console.log('=============' + newState)
        // const songList = newState.songs.map((song) => newState[song.id]);
        // songList.push(action.song);
        // newState.list = sortList(pokemonList);
        // console.log(newState)
        // newState = songList
        return newState;

    }
    default:
      return state;
  }
};

export default songReducer;
