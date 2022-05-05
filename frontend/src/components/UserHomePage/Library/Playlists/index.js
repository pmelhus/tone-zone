import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Playlist from './Playlist'
import { getAllPlaylists } from "../../../../store/playlists";


const Playlists = () => {



  return (
    <div>
      <Playlist />
    </div>
  )
}

export default Playlists
