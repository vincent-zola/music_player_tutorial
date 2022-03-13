import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({ songs, setCurrentSong, audioRef,isPlaying,setSongs, libraryStatus }) => {
  return (
    // if libraryStatus true add 'active-library' class else nothing
    <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
      <h2>Library</h2>
      {/* looping through our songs to create a component for each on and passing obj data to LibrarySong */}
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
          setSongs={setSongs}
            setCurrentSong={setCurrentSong}
            songs={songs}
            song={song}
            id={song.id}
            // key is needed because React requires us to add on... wtf? 
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
