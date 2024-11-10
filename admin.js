document.getElementById('add-movie-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const movieName = document.getElementById('movie-name').value;
    const iframeLink = document.getElementById('iframe-link').value;
    const posterCdnLink = document.getElementById('poster-cdn-link').value;
  
    const response = await fetch(`http://www.omdbapi.com/?t=${movieName}&apikey=1ea67d6f`);
    const movieData = await response.json();
  
    if (movieData.Response === "True") {
      const movieRef = database.ref('movies').push();
      await movieRef.set({
        title: movieData.Title,
        iframe: iframeLink,
        poster: posterCdnLink,
        writer: movieData.Writer,
        director: movieData.Director,
        actors: movieData.Actors,
        plot: movieData.Plot,
        country: movieData.Country,
        rating: movieData.imdbRating,
      });
      alert("Movie added successfully!");
    } else {
      alert("Movie not found in OMDb database.");
    }
  });
  