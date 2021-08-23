import React from 'react';
import genresService from '../../service/genresService';
import '../../styles.css';

const MovieCard = ({ title, description, rating, popularity, backdrop_path, genre_ids, availableGenres }) => {
    
  return (
    <div className={ ['movie'].join(' ') }>
      <img
        className={ ['movie-image'].join(' ') }
        src={ `https://image.tmdb.org/t/p/w500${backdrop_path}` }
        alt={title}
      />
      <h2 className={ ['movie-title'].join(' ') }>
        { title }
      </h2>
      <p className={ ['movie-content'].join(' ') } >
        { description }
      </p>
      <p className={ ['movie-meta'].join(' ') }>
        Rating: { rating }/10
      </p>
      <p className={ ['movie-meta'].join(' ') }>
        Popularity: { popularity }
      </p>
      <p className={ ['movie-meta'].join(' ') }>
        Genres: { genresService.genresForUI(genre_ids,availableGenres) }
      </p>
    </div>
  )
}

export default MovieCard;