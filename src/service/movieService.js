const movieService = {
  sort:(movieList, genresList, voteAverage) => {
    if(!movieList) {
      return;
    }

    if(genresList.length > 0) {
      movieList = movieService.sortByGenres(movieList, genresList)
    }

    if(voteAverage) {
      movieList = movieService.sortByAverageVote(movieList, voteAverage)
    }

    return movieList;

  },
  sortByGenres: (movieList, genresList) => {
    const genresIds = genresList.map(genre => genre.id);
    let updatedMovieList = [];

    movieList.map(movie => {
      const hasGenres = genresIds.every(r=> movie.genre_ids.includes(r))
      hasGenres && updatedMovieList.push(movie)
    })

    return updatedMovieList;
  },
  sortByAverageVote:(moviesList, averageVote) => moviesList?.filter(movie => movie.vote_average === averageVote ),
}

export default movieService;