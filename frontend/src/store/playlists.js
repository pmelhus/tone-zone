import { ValidationError } from "../utils/validationError";
import { csrfFetch } from "./csrf";

const ADD_ONE = "playlists/ADD_ONE";
const ADD_ONE_SONG = "playlists/ADD_ONE_SONG";
const UPDATE = "playlists/UPDATE";
const DELETE = "playlists/DELETE";
const LOAD = "playlists/LOAD";
const GET_ONE = "playlists/GET_ONE";
const GET_ALL_SONGS = "playlists/GET_ALL_SONGS";
const DELETE_ONE_SONG = "playlists/DELETE_ONE_SONG";

const addOnePlaylist = (payload) => ({
  type: ADD_ONE,
  payload,
});

const addOneSongToPlaylist = (song, playlist) => ({
  type: ADD_ONE_SONG,
  song,
  playlist,
});

const getOne = (playlist) => ({
  type: GET_ONE,
  playlist,
});

const getPlaylists = (playlists) => ({
  type: LOAD,
  playlists,
});

const getAllSongs = (songs) => ({
  type: GET_ALL_SONGS,

  songs,
});

const update = (playlist) => ({
  type: UPDATE,
  playlist,
});

const deletePlaylist = (playlist) => ({
  type: DELETE,
  playlist,
});

const deleteSong = (payload) => ({
  type: DELETE_ONE_SONG,
  payload,
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

    const payload = await response.json();
    // console.log(payload)
    dispatch(addOnePlaylist(payload));
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

    // console.log(playlists)
  } else {
    throw res;
  }
};

export const getAllSongsPlaylist = (id) => async (dispatch) => {
  const res = await fetch(`/api/playlists/songs/${id}`);

  // console.log(res, '==================?!?!?!?')
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllSongs(data));
    console.log(data, "============");
    // console.log(playlists)
  } else {
    throw res;
  }
};

export const getOnePlaylist = (id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${id}`);

  const playlist = await response.json();
  console.log(playlist, "$$$$$$$$$$$$$$$$");
  dispatch(getOne(playlist));
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
    // console.log(returned, '++++++++++++++=')
    // console.log(returned.data.song)
    dispatch(addOneSongToPlaylist(returned.data.song, returned.data.playlist));
  } catch (error) {
    throw error;
  }
};

export const updatePlaylist = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/playlists/${data.id}`, {
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

export const deleteOnePlaylist = (data) => async (dispatch) => {
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

export const deleteOneSong = (data) => async (dispatch) => {
  console.log(data, "here!");
  const response = await csrfFetch(`/api/playlists/song/${data.song.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const deletedSong = await response.json();
  console.log(deletedSong, "======?!?!??!?!");
  dispatch(deleteSong(deletedSong));
};

const initialState = { playlistSongs: [] };

const sortList = (list) => {
  return list
    .sort((songA, songB) => {
      return songA.id - songB.id;
    })
    .map((song) => song.id);
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ONE: {
      // console.log(state)
      const newState = {
        ...state,
        [action.payload.playlist.id]: {
          ...action.payload.playlist,
          Songs: { ...action.payload.song },
          User: { ...action.payload.user },
        },
      };
      return newState;
    }

    case GET_ONE: {
      // console.log(playlistSongs, "HEEERE")
      if (action.playlist) {
        const newState = { ...state, [action.playlist.id]: action.playlist };
        return newState;
      }

      return state;
    }

    case ADD_ONE_SONG: {
      console.log(action);
      const newState = {
        ...state,
        [action.playlist.id]: {
          ...action.playlist,
          Songs: { ...state.Songs, [action.song.id]: action.song },
        },
      };

      return newState;
    }

    case GET_ALL_SONGS: {
      const newState = {
        ...state,
        [state.playlists]: { ...state.playlist, Songs: { ...action.songs } },
      };

      return newState;
    }

    case UPDATE: {
      let newState = { ...state };
      let newStateObj = Object.values(newState);
      const playlist = newStateObj.find(
        (object) => object.id === action.playlist.id
      );

      playlist.title = action.playlist.title;

      return newState;
    }

    case LOAD: {
      const newState = { ...state };
      console.log(action.playlists);
      action.playlists.forEach(
        (playlist) => (newState[playlist.id] = playlist)
      );
      return newState;
    }

    case DELETE: {
      delete state[action.playlist.id];
      const newState = { ...state };
      return newState;
    }
    case DELETE_ONE_SONG: {
      console.log(action.payload, "payload!!!");
      const newSongsArr = state[action.payload.playlist.id].Songs.filter(
        (object) => object.id !== action.payload.song.id
      );
      state[action.payload.playlist.id].Songs = newSongsArr;
      const newState = { ...state };
      return newState;
    }
    default:
      return state;
  }
};

export default playlistReducer;
