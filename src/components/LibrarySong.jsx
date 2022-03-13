import React from "react";


const LibrarySong = ({
  song,
  songs,
  id,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs
}) => {
  const songSelectHandler = async () => {
    // changing songs[0] (obj) to the one we clicked on
    await setCurrentSong(song);
    // Add Active State
    // songs = array of song obj defined in App.js
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          // keep everything from obs the same
          ...song,
          // but change the following:
          active: true,
        };
      } else {
        return {
          // keep everything from obs the same
          ...song,
          // but change the following:
          active: false,
        };
      }
    });
    // passing new defined song obj in to the setSongs state defined in App.js
    console.log('Select Song')
    setSongs(newSongs)
    // check if song is playing
    if(isPlaying) audioRef.current.play()
  };

  return (
    // click on whole div to change song
    // use interpolation to add class "selected" if song.active if true in our obj
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      {/* song = one obj from data.js */}
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
