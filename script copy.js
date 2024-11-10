import { database } from './firebase-config.js';

const movieListContainer = document.getElementById('movie-list');
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const noMoviesFoundContainer = document.getElementById('no-movies-found');

// Fetch all movies from Firebase and display them
database.ref('movies').on('value', (snapshot) => {
  const movies = [];

  snapshot.forEach((childSnapshot) => {
    const movie = childSnapshot.val();
    const movieId = childSnapshot.key;
    movies.push({ id: movieId, ...movie });
  });

  // Display all movies initially
  displayMovies(movies);

  // Filter movies when the search button is clicked
  searchBtn.addEventListener('click', () => {
    searchMovies(movies);
  });

  // Add functionality to search when the 'Enter' key is pressed
  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchMovies(movies);
    }
  });
});

// Function to display the movies
function displayMovies(movies) {
  movieListContainer.innerHTML = ''; // Clear the existing movie list

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'overflow-hidden');  // Tailwind card styling

    const moviePosterContainer = document.createElement('div');
    moviePosterContainer.classList.add('relative', 'h-56');  // Set a fixed height for the poster

    const moviePoster = document.createElement('img');
    moviePoster.src = movie.poster;
    moviePoster.alt = movie.title;
    moviePoster.classList.add('w-full', 'h-full', 'object-cover');  // Ensure the poster fits the container

    const cardBody = document.createElement('div');
    cardBody.classList.add('p-2');

    const movieTitle = document.createElement('h5');
    movieTitle.textContent = movie.title;
    movieTitle.classList.add('text-lg', 'font-semibold', 'text-center');

    // Make the poster and title clickable by linking to movie-detail.html with the movie ID as a query parameter
    movieCard.addEventListener('click', () => {
      window.location.href = `movie-detail.html?id=${movie.id}`;
    });

    // Append elements to the card and container
    moviePosterContainer.appendChild(moviePoster);
    cardBody.appendChild(movieTitle);
    movieCard.appendChild(moviePosterContainer);
    movieCard.appendChild(cardBody);
    movieListContainer.appendChild(movieCard);
  });
}

// Function to handle the search
function searchMovies(movies) {
  const searchTerm = searchBar.value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  if (filteredMovies.length === 0) {
    noMoviesFoundContainer.classList.remove('hidden');
  } else {
    noMoviesFoundContainer.classList.add('hidden');
  }

  displayMovies(filteredMovies);

  // Update the URL to reflect the search query (without reloading the page)
  if (searchTerm) {
    history.pushState({ searchTerm }, '', `?search=${encodeURIComponent(searchTerm)}`);
  } else {
    history.pushState({}, '', window.location.pathname);
  }
}

// Listen for changes in the URL (when the user presses the back button)
window.addEventListener('popstate', (event) => {
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get('search') || '';
  searchBar.value = searchTerm;

  // Fetch movies and display them based on the search term in the URL
  database.ref('movies').once('value', (snapshot) => {
    const movies = [];
    
    snapshot.forEach((childSnapshot) => {
      const movie = childSnapshot.val();
      const movieId = childSnapshot.key;
      movies.push({ id: movieId, ...movie });
    });

    if (searchTerm) {
      const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayMovies(filteredMovies);

      // If no movies found, show the "Movie Not Found" message
      if (filteredMovies.length === 0) {
        noMoviesFoundContainer.classList.remove('hidden');
      } else {
        noMoviesFoundContainer.classList.add('hidden');
      }
    } else {
      // If no search term, show all movies and hide the "Movie Not Found" message
      displayMovies(movies);
      noMoviesFoundContainer.classList.add('hidden');
    }
  });
});
