import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "songs/ADD_ONE";
const LOAD = "songs/LOAD";
const UPDATE = "songs/UPDATE";
const DELETE = "songs/DELETE";
const GET_ONE = "songs/GET_ONE";

const addOneSong = (song, user) => ({
  type: ADD_ONE,
  song, user
});

const getOne = (song) => ({
  type: GET_ONE,
  song,
});

const getSongs = (songs) => ({
  type: LOAD,
  songs,
});

const update = (song) => ({
  type: UPDATE,
  song,
});

const deleteSong = (song) => ({
  type: DELETE,
  song
});

export const getAllSongs = () => async (dispatch) => {
  // console.log('================')
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

  const song = await response.json();

  // console.log('===================')
  // console.log(song)
  dispatch(getOne(song));
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
    console.log("=================", song)
    dispatch(addOneSong(song, song.user));
  } catch (error) {
    throw error;
  }
};

export const updateSong = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${data.songId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const song = await response.json();
  dispatch(update(song));
  return song;
};

export const deleteOneSong = (data) => async (dispatch) => {
  console.log("============");
  const response = await csrfFetch(`/api/songs/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const song = await response.json();
console.log('SONG', song)
  dispatch(deleteSong(song));
};

const initialState = {};

// const sortList = (list) => {
//   return list.sort((songA, songB) => {
//     return songA.id - songB.id;
//   }).map((song) => song.id);
// };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      const newState = { ...state };
      action.songs.forEach((song) => (newState[song.id] = song));
      return newState;
    }
    case ADD_ONE: {
      if (!state[action.song.id]) {
        // console.log(action.user)
        const newState = {
          ...state,
          [action.song.song.id]: {...action.song.song, User: action.user}

        };

        // const songList = newState.songs.map((song) => newState[song.id]);
        // songList.push(action.song);
        // newState.list = sortList(pokemonList);
        return newState;
      }
    }
    case GET_ONE: {
      const newState = { ...state, [action.song.id]: action.song };

      return newState;
      // const newState = {...state}
      // console.log(newState)
    }
    case UPDATE: {
      let newState = { ...state };
      let newStateObj = Object.values(newState);
      const song = newStateObj.find((object) => object.id === action.song.id);

      song.title = action.song.title;
      song.description = action.song.description;

      return newState;
    }

    case DELETE: {
      console.log(state);
      console.log('=============>', action.song)
      // const newSong = state.id.filter(song=>{song.id !== action.song.id})
      delete state[action.song.id]
      const newState = { ...state };
console.log(state)
      return newState;
    }
    default:
      return state;
  }
};

export default songReducer;
