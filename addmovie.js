// addmovie.js
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBn7nYnu7ZnoaqB0Qin1doAMHs441Yhu8Q",
  authDomain: "themvdetail.firebaseapp.com",
  databaseURL: "https://themvdetail-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "themvdetail",
  storageBucket: "themvdetail.firebasestorage.app",
  messagingSenderId: "800809902995",
  appId: "1:800809902995:web:afe2d353fa50430ea5be66",
  measurementId: "G-L0M1B2CG55"
};

// Check if Firebase app is already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();

document.getElementById('add-movie-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const movieName = document.getElementById('movie-name').value;
  const iframeLink = document.getElementById('iframe-link').value;

  try {
    const response = await fetch(`http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=1ea67d6f`);
    const movieData = await response.json();

    if (movieData.Response === "True") {
      const posterCdnLink = movieData.Poster;

      // Save movie data to Firebase
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
      document.getElementById('add-movie-form').reset();
    } else {
      alert("Movie not found in OMDb database.");
    }
  } catch (error) {
    console.error("Error adding movie:", error);
    alert("An error occurred while adding the movie.");
  }
});
