export const fetchMovies = () => fetch('./movies.json').then(data => data.json());
