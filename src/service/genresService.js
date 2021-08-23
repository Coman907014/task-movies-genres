const genresService = {
  getAvailable: (movieList, genresList) => {
    
    if(!movieList || !genresList) {
      return;
    }

    let availableGenres = [];
    movieList.map(movie => movie.genre_ids.map(id => {
      if(!genresService.getGenreById(availableGenres, id)) {
        availableGenres.push(genresService.getGenreById(genresList, id))
      }
    }))

    return availableGenres;
  },
  getGenreById:(genreList, id) => {

    if(!genreList || genreList.length === 0) {
      return 
    };

    return genreList.find(genre => genre.id === id)
  },
  removeGenreById:(genreList, id) => {

    if(genreList.length === 0) {
      return genreList
    }

    let newList = genreList
    genreList?.map((genre, index) => {
      if(genre.id === id) {
        newList.splice(index, 1)
    }
    })

    return newList;
  },
  genresForUI:(movieGenresIds, genresList) => {

    if(!movieGenresIds || !genresList) {
      return;
    }

    let genresForRender = [];

    movieGenresIds.map(id => {
      const matchingGenre = genresService.getGenreById(genresList, id)
      
      if(matchingGenre) {
        genresForRender.push(`${matchingGenre.name}`)
        genresForRender.push(`,`)
      }
    })

    // Removing the last comma
    genresForRender.splice(genresForRender.length -1, 1);
    if(genresForRender.length > 1) {
      // Replacing the comma between the last two genres with 'and'
      genresForRender.splice(genresForRender.length -2, 1, 'and');
    }
  
    return genresForRender.join(' ')
  }
};

export default genresService