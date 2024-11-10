import { database } from './firebase-config.js';

// Get the movie ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const movieTitle = document.getElementById('movie-title');
const movieRating = document.getElementById('movie-rating');
const movieWriter = document.getElementById('movie-writer');
const movieDirector = document.getElementById('movie-director');
const movieActors = document.getElementById('movie-actors');
const movieCountry = document.getElementById('movie-country');
const moviePlot = document.getElementById('movie-plot');
const movieIframe = document.getElementById('movie-iframe');

// Fetch movie details from Firebase by movie ID
database.ref('movies/' + movieId).once('value', (snapshot) => {
    const movieData = snapshot.val();

    if (movieData) {
        // Display movie iframe (trailer)
        const iframeElement = document.createElement('iframe');
        iframeElement.src = movieData.iframe;
        iframeElement.classList.add('w-full', 'h-full', 'rounded-lg', 'max-w-full', 'aspect-video');
        iframeElement.frameBorder = '0';
        iframeElement.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        iframeElement.allowFullscreen = true;
        movieIframe.appendChild(iframeElement);

        // Set movie details in the page
        movieTitle.textContent = movieData.title;
        movieRating.textContent = `IMDb Rating: ${movieData.rating}`;
        movieWriter.textContent = movieData.writer;
        movieDirector.textContent = movieData.director;
        movieActors.textContent = movieData.actors;
        movieCountry.textContent = movieData.country;
        moviePlot.textContent = movieData.plot;
    }
});
