// useRef = for selecting HTML elements
import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// import songs (Fn which returns us array of objects)
import data from "./data";
import "./styles/app.scss";

function App() {
  // Ref
  // create reference and add it to an HTML element and get an obj which contains the element, "current: audio"
  const audioRef = useRef(null);

  // State

  // data() gets executed in useState and transferred in the variable songs, songs contains now array of obj with music data.
  const [songs, setSongs] = useState(data());
  // Selecting default song (which is an obj) which will be available at start of app, songs[0] has active: true
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // useState to change the play, pause button
  const [isPlaying, setIsPlaying] = useState(false);

  // creating obj which will store the duration and current-play-time of song
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    // for slider animation in CSS
    animationPercentage: 0,
  });
  // Check is the Library open or not
  const [libraryStatus, setLibraryStatus] = useState(false);

  // Fn executes when audio changes, e = time played, audio duration
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // Calculate Percentage
    // Math.round returns the value of a number rounded to the nearest integer
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    // Basically, calculate the '% value' of 'current' with the 'Dreisatz', animation % in CSS
    const animation = Math.round((roundedCurrent * 100) / roundedDuration);

    setSongInfo({
      // why import previous values?
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercentage: animation,
    });
  };
  // Add Active State
  const activeLibraryHandler = (nextPrev) => {
    // songs = array of song obj defined in App.js
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          // keep everything from obj the same
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
    setSongs(newSongs);
  };


  // Fn when song ends
  const songEndHandler = async () => {
    // find current index in song array 
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    // To create a loop we use the modulus operator
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      {/* passing a prop = currentSong={currentSong} it allows us to use currentSong variable in our Song component */}
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        activeLibraryHandler={activeLibraryHandler}
      />
      {/* passing all songs to library and setCurrentSong*/}
      <Library
        libraryStatus={libraryStatus}
        setSongs={setSongs}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
      />
      {/* ref={audioRef} = adding reference */}
      {/* onTimeUpdate = Execute a JavaScript when the current playback position has changed*/}
      {/* onLoadedMetadata = Execute a JavaScript when meta data for a video is loaded: */}
      <audio
        // sets duration and current-time from the start
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        // Event kicks in if song ends
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
