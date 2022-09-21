import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
     const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=edbfcd53`
    
     const response = await fetch(url);
     const responseJson = await response.json();

     if(responseJson.Search){
     setMovies(responseJson.Search)
     }
  };

  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
		const movieFavorites = JSON.parse(
			localStorage.getItem('react-movie-app-favorites')
		);

		setFavorites(movieFavorites);
	}, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const AddFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='ShawnFlix'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className="row">
        <MovieList movies={movies} handeFavoritesClick={AddFavoriteMovie} favoriteComponent = {AddFavorite} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading='Favorites'/>
      </div>
      <div className="row">
        <MovieList movies={favorites} handeFavoritesClick={removeFavoriteMovie} favoriteComponent = {RemoveFavorites} />
      </div>
    </div>
  );
};

export default App;
