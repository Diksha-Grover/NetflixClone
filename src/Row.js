import React, { useState, useEffect } from "react";
// imports DEFAULT(alias) export from axios.js
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_URL = "https://image.tmdb.org/t/p/original/";

// Row component
function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerURL, setTrailerURL] = useState("");

  useEffect(() => {
    async function fetchData() {
      // Waiting for the promise to come back with movie results, fetchURL(outside the code block)
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // setting autoplay to 1 will start playing the video automatically
      autoplay: 1,
    },
  };

  console.log('trailerURL',trailerURL)

  //   When user clicks on the movie picture
  const handleClick = (movie) => {
    //   If trailer is found clear the url
    if (trailerURL) {
      setTrailerURL("");
    } else {
      // Search for movie trailer full url
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); // urlParams gives us everthing after the ?
          setTrailerURL(urlParams.get("v")); //urlParams gives us everything after v=
          // Displays error message if unable to find url
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* Container for movie rows */}
      <div className="row__posters">
        {/* several row poster */}
        {/* Looping through movies array API */}
        {movies.map((movie) => (
          //   returns movie images in new array
          <img
            //   "key" loads movie row faster knowing the movie id
            key={movie.id}
            // Setting up onClick event for trailer
            onClick={() => handleClick(movie)}
            // All poster same size (row__poster) except if you are larger row, then use
            // isLargeRow
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            // Loads poster images from base url
            src={`${base_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
        {/* Contain -> posters */}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  );
}

export default Row;
