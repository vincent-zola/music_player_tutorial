// useRef = for selecting HTML elements
import React from "react";
// import Font Awesome Component from npm installed package
// import {} = means just import specific part of library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Font Awesome Specific Icons
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

// create functional compound
const Player = ({
  songs,
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  setCurrentSong,
  setSongs,
  activeLibraryHandler,
}) => {



  // Event Handlers
  const playSongHandler = () => {
    // If true pause, change to false,
    if (isPlaying) {
      audioRef.current.pause();
      // change bool to opposite what it was
      setIsPlaying(!isPlaying);
      // If false, play, change to true,
    } else {
      // audioRef = obj, current = key, so audio.play(), html-element.play(), play() = JS Fn
      audioRef.current.play();
      // change bool to opposite what it was
      setIsPlaying(!isPlaying);
    }
  };

  // Fn to format time to min and s
  const getTime = (time) => {
    return (
      //.slice(-2) return last two values of string
      // Ex. 4s: Math.floor(4/60) = 0 + ":" (0 + 4).slice(-2) = 04 = 0:04
      // Ex. 10s: Math.floor(10/60) = 0 + ":" (0 + 10).slice(-2) = 10 = 0:10
      // Ex. 10s: Math.floor(100/60) = 1 + ":" (0 + 40).slice(-2) = 04 = 1:40
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  // Fn dragging the slider
  const dragHandler = (e) => {
    // audioRef.current = audio, audio.currentTime = inside html audio element = set new value
    audioRef.current.currentTime = e.target.value;
    // change state by dragging to new value
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // Skip Tracks

  const skipTrackHandler = async (direction) => {
    // find index of song which is playing right now, ex. 0,1,2....
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      // To create a loop we use the modulus operator
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === "skip-back") {
      if (currentIndex === 0) {
        currentIndex = songs.length - 1;
        await setCurrentSong(songs[currentIndex]);
        activeLibraryHandler(songs[currentIndex])
        if (isPlaying) audioRef.current.play();
      } else {
        await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
      }
    }
    if (isPlaying) audioRef.current.play();
  };

  // Add the styles
  const trackAnim = {
    // translateX(1-100)% declared in _player.scss
    // animationPercentage is stored in State, in App.js, in songInfo
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    // Elements must be wrapped in a DIV
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        {/* Adding Linear-gradient to slider */}
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            // || 0 means that if data is not loaded display 0
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          {/* inject CSS Style directly in JSX */}
          <div style={trackAnim} className="animate-track"></div>
        </div>

        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        {/* passing icons as props in our project and increase size */}
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          // change icon direct on jsx element
          // if isPlaying true than faPause, else faPlay
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
