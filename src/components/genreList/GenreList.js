import React from 'react';
import GenreComponent from './GenreComponent';
import genresService from '../../service/genresService';
import '../../styles.css';

const GenreList = ({ genres, onClick, selectedGenres }) => {
  return (
    <div className={ ['genres-list'].join(' ') }>
      {
        genres?.map(genre =>
          <GenreComponent
            key={ genre.id }
            genre={ genre }
            onClick={ onClick }
            isSelected={ Boolean(genresService.getGenreById(selectedGenres, genre.id)) }
          />
        )
      }
    </div>
  )
};

export default GenreList;