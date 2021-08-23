export const fetchGenres = () => fetch('./genres.json').then(data => data.json());
