import React from 'react';
import '../../styles.css';

const GenreComponent = ({ genre, onClick, isSelected }) => {
  return (
    <div className={ ['genre-component'].join(' ') }>
      <input
        type="checkbox"
        id={ genre?.id }
        name={ genre?.name }
        onChange={ (e) => {
          e.stopPropagation();
          onClick(genre?.id)
        } }
        checked={ isSelected }
        />
      <label htmlFor={ genre?.name }>{ genre?.name }</label>
    </div>
  )
};

export default GenreComponent;