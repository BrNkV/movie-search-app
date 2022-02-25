const main = document.querySelector('.main');
const inp = document.querySelector('.search');
const form = document.querySelector('.form');

const apiKey = 'api_key=3c931b13086060ede0e71380c8f2b4a4';

const mainUrl = 'https://api.themoviedb.org/3';
const apiUrl = mainUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const searchUrl = mainUrl + '/search/movie?' + apiKey
const imgUrl = 'https://image.tmdb.org/t/p/w1280';

getData(apiUrl);

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();
    cardCreator(data);
};

function cardCreator(data) {
    main.innerHTML = '';
    data.results.forEach(data => {
        let movieCard = document.createElement("div");
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
             <img src="${imgUrl}${data.poster_path}" alt="${data.title}">
                <div class="movie-info">
                    <h3>${data.title}</h3>
                    <span class="raiting ${raiting(data.vote_average)}">${data.vote_average}</span>
                </div>
                <div class="movie-date">
                    <span>Release: ${release(data.release_date)}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    ${data.overview}
                </div>
        `
        main.appendChild(movieCard);
    });
}

let raiting = (data) => {
    // console.log(data);
    if (data >= 8) return 'green';
    if (data >= 5) return 'orange';
    if (data >= 0) return 'red';
}

let release = (data) => {
    return data.slice(0, 4);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    let search = inp.value;
    if (search) {
        getData(searchUrl + '&query=' + search);
        inp.value = '';
    }
    else {
        getData(apiUrl);
    }
});