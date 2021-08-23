import React from 'react';
import '../../styles.css';

const VoteAverage = ({ onChange, value, options }) => (
  <div className={ ['voteAverage'].join(' ') }>
    <select onChange={ onChange } value={ value }>
      { options.map(option => <option key={ option } value={ option }> { option } </option>) }
    </select>
  </div>
)

export default VoteAverage;