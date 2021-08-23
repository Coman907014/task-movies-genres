import React, { useEffect, useState, useCallback, useMemo } from 'react';

import { fetchGenres, fetchMovies } from './api'; // you may add functionality to these functions, but please use them
import './styles.css'; // have a look at this file and feel free to use the classes
import MovieCard from './components/movieCard/MovieCard';
import VoteAverage from './components/voteAverage/VoteAverage';
import GenreList from './components/genreList/GenreList';
import errorHandler from './service/errorHandler';
import sortingService from './service/sortingService';
import genresService from './service/genresService';
import movieService from './service/movieService';

export default function App() {
  const defaultVoteAverage = 3;
  const [movies, setMovies] = useState(null);
  const [genres, setGenres] = useState(null);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isSelectionInProgress, setIsSelectionInProgress] = useState(false);
  const [voteAverage, setVoteAverage] = useState(defaultVoteAverage);
  const [shouldSortByVote, setShouldSortByVote] = useState(false);

  const voteAverageOptions = useMemo(() => {
    let newOptions = [];
    const maxValue = 10;
    // With this increment only the values: 6, 6.5, 7, 8 have a match in terms of voteAverage
    // We should get available increments and render only those
    // Similar to what we did in line 94
    const increment = 0.5

    for(let i=0; i <= maxValue; i += increment) {
      newOptions.push(i)
    }

    return newOptions;
  }, []);

  const getMovies = useCallback(() => {
    fetchMovies()
      .then(movies => setMovies(sortingService.byProperty(movies, 'popularity', 'desc')))
      .catch(errorHandler.handleError)
  }, []);

  const getGenres = useCallback(() => {
    fetchGenres()
      .then(genres => setGenres(genres))
      .catch(errorHandler.handleError)
  }, []);


  const handleGenreSelection = useCallback((id) => {
    setIsSelectionInProgress(true);
    let newGenres = [...selectedGenres];

    if(selectedGenres.length === 0 || !genresService.getGenreById(selectedGenres, id)) {
      newGenres.push(genresService.getGenreById(availableGenres, id))
    } else {
      newGenres = genresService.removeGenreById(newGenres, id);
    }

    return setSelectedGenres(newGenres);
  }, [availableGenres, selectedGenres]);

  const sortMovies = useCallback(() => {

    if(!isSelectionInProgress) {
      return;
    };

    setSelectedMovies(movieService.sort(movies, selectedGenres, shouldSortByVote && voteAverage))

  }, [movies, selectedGenres, voteAverage]);

  const handleVoteChange = useCallback((e) => {
    setIsSelectionInProgress(true);
    setVoteAverage(+e.target.value);
    setShouldSortByVote(true);
  }, []);

  const handleFiltersReset = useCallback(() => {
    setIsSelectionInProgress(false);
    setSelectedGenres([]);
    setSelectedMovies([]);
    setVoteAverage(defaultVoteAverage);
    setShouldSortByVote(false)
  }, [])
  
  useEffect(() => {
    getMovies();
    getGenres();
  }, []);

  useEffect(() => {
    if(!movies || !genres) {
      return;
    }
  
    setAvailableGenres(genresService.getAvailable(movies, genres));
  }, [movies, genres]);

  useEffect(() => {
    sortMovies()
  }, [movies, selectedGenres, voteAverage]);

  
  const moviesToRender = isSelectionInProgress ? selectedMovies : movies;
  return (
    <div>
      <h1>
        <span>
          <span role="img" aria-label="Popcorn emoji">
            🍿
          </span>{' '}
          Now playing
        </span>
      </h1>
      <div>
        <div>Showing { moviesToRender?.length || 0 } { `movie${ moviesToRender?.length > 1 ? 's' : '' }` }</div>
        <GenreList
          genres={ availableGenres }
          onClick={ handleGenreSelection }
          selectedGenres={ selectedGenres }
        />
        <VoteAverage onChange={ handleVoteChange } options={ voteAverageOptions } value={ voteAverage }/>
        <button onClick={ handleFiltersReset }>Reset Filters</button>
        { 
          moviesToRender?.map(movie => <MovieCard key={ movie.title } { ... movie } availableGenres={ availableGenres }/>)
        }
      </div>
    </div>
  );
}
