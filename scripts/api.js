const url = "https://www.omdbapi.com/?apikey=d1f2a748&t=";
let inputForm;
let moviePoster;
let movieInfo;

window.onload = () => {
    inputForm = document.getElementById("search-text");
    moviePoster = document.getElementById("movie-poster");
    movieTitle = document.getElementById("movie-title");
    movieYear = document.getElementById("movie-year");
    moviePlot = document.getElementById("movie-plot");
    movieRating = document.getElementById("movie-rating");
    movieCard = document.getElementById("movie-card")
};

function getApi(){
  if(inputForm.value === ''){
    alert('You need to type something');
    return;
  }
    fetch(url + inputForm.value)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
        console.log(data);
        movieInfo = data;
        movieCard.classList.remove("d-none");
        moviePoster.src = data.Poster;
        movieTitle.innerText = data.Title;
        movieYear.innerText = data.Year;
        moviePlot.innerText = data.Plot;
        movieRating.innerText = `${data.imdbRating}/10`;
    })
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function postData(url, data) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log('Success:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
}

  
function addToFavourites(){
    postData('/addfavourite', {title: movieInfo.Title, year: movieInfo.Year, plot: movieInfo.Plot, rating: movieInfo.imdbRating, poster: movieInfo.Poster, type: movieInfo.Type, imdbId: movieInfo.imdbID});
}
