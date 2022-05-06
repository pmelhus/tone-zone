// import { ValidationError } from "../utils/validationError";
// import { csrfFetch } from "./csrf";

// const GET_ALL_SONGS ='playlists/GET_ALL_SONGS'

// const getAllSongs = (songs) => ({
//   type: GET_ALL_SONGS,

//   songs
// })

// export const getAllSongsPlaylist = () => async (dispatch) => {
//   const res = await fetch("/api/playlists/songs");
//   console.log('AHHHHH')
//   if (res.ok) {
//     const data = await res.json();
// console.log(data, '==================')
//     dispatch(getAllSongs(data));

//     // console.log(playlists)
//   } else {
//     throw res
//   }

// }

// const initialState = {};

// const playlistReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ALL_SONGS: {
//       const newState = {...state};
//       const songs = Object.values(action.songs)
//       console.log(songs)
//       songs.forEach((song) => (newState[song.id] = song))
//       return newState
//     }
//     default:
//       return state;
//   }
// };

// export default songsPlaylistReducer
