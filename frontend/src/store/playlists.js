import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "playlists/ADD_ONE";
const ADD_ONE_SONG = 'playlists/ADD_ONE_SONG'
const UPDATE = "playlists/UPDATE";
const DELETE = "playlists/DELETE";
const LOAD = "playlists/LOAD";

const addOnePlaylist = (playlist) => ({
  type: ADD_ONE,
  playlist
});


const addOneSongToPlaylist = (song, playlist) => ({
  type: ADD_ONE_SONG,
  song, playlist
})

const getPlaylists = (playlists) => ({
  type: LOAD,
  playlists,
});

const update = (playlist) => ({
  type: UPDATE,
  playlist,
});

const deletePlaylist = (playlist) => ({
  type: DELETE,
  playlist,
});

export const createPlaylist = (data) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/playlists/`, {
      method: "POST",
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

    const playlist = await response.json();

    dispatch(addOnePlaylist(playlist));
  } catch (error) {
    throw error;
  }
};

export const getAllPlaylists = () => async (dispatch) => {
  // console.log('================')
  const res = await fetch("/api/playlists");
  if (res.ok) {
    const playlists = await res.json();

    dispatch(getPlaylists(playlists));

    console.log(playlists)
  } else {
    throw res;
  }
};

export const addSongToPlaylist = (data) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/playlists/song`, {
      method: "POST",
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

    const returned = await response.json();
console.log(returned, '++++++++++++++=')
console.log(returned.data.song)
    dispatch(addOneSongToPlaylist(returned.data.song, returned.data.playlist));
  } catch (error) {
    throw error;
  }
}

export const updatePlaylist = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${data.playlist.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const playlist = await response.json();
  dispatch(update(playlist));
  return playlist;
};

export const deleteOneplaylist = (data) => async (dispatch) => {
  console.log(data)
  const response = await csrfFetch(`/api/playlists/${data.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const playlist = await response.json();

  dispatch(deletePlaylist(playlist));
};

const initialState = {};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE: {
      const newState = {
        ...state,
        [action.playlist.id]: { ...action.playlist, User: action.user },
      };
      return newState;
    }

    case ADD_ONE_SONG:{
      const newState = {
        ...state, [action.playlist.id]: { ...action.playlist, Songs: action.song }
      }
      return newState;
    }

    case LOAD: {
      const newState = { ...state };
      action.playlists.forEach((playlist) => (newState[playlist.id] = playlist));
      return newState;
    }

    case DELETE: {
      delete state[action.playlist.id];
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
};

export default playlistReducer;
