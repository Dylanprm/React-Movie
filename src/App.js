import React, { useState, useEffect } from 'react';

import MovieCard from './MovieCard.jsx';
import './App.css';
import SearchIcon from './search.svg';


const API_URL = "http://www.omdbapi.com?apikey=c4dd1f1a";

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // searchMovies fetches the movie titles from the api url so we may display the data results in the movie app
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  return (
    <div className='app'>
      <h1>React Movie App</h1>

      <div className='search'>
        <input
          placeholder='Search for Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
