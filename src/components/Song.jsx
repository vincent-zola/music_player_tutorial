// Components created in React should have .jsx ending as a standard, no real difference thou
import React from "react";

// create functional compound
// passing props
const Song = ({ currentSong }) => {
  return (
    // Elements must be wrapped in a DIV
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
