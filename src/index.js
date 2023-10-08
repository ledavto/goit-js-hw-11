// npm install axios
// npm install slim-select
// npm i notiflix
// npm install simplelightbox

// https://pixabay.com/api/docs/
// 39839369-8c713c9a2c0ac40d1d76da13a

// https://pixabay.com/api/?key=39839369-8c713c9a2c0ac40d1d76da13a&q=yellow+flowers&image_type=photo

import Notiflix from 'notiflix';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';

// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '39839369-8c713c9a2c0ac40d1d76da13a';
const IMG_KOL = 40;
let pageNum = 1;

const elForm = document.querySelector('.search-form');
const inputText = document.querySelector('input');
const contLoadMore = document.querySelector('.container-load-more');
const elBtn = document.querySelector('.load-more');
const elGallery = document.querySelector('.gallery');


elForm.addEventListener('submit', onClickSearch);
elBtn.addEventListener('click', onLoadMore);

//Объвление асинхронной функции
const fetchSearchPhoto = async (input, page) => {
 // console.log(`Text= ${input} page=${page}`);
  const response = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${IMG_KOL}&page=${page}`
  );

  const photos = await response.data.hits;

  const totalImg = await response.data.totalHits;
  
  //Выводим сообщение о найденных FOTO
  if (totalImg > IMG_KOL * page) {
    Notiflix.Notify.success(`Hooray! We found ${page * IMG_KOL} of ${totalImg} images.`);
    contLoadMore.style.display = 'flex';
  }
  else {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    contLoadMore.style.display = 'none';
  }
  
  return (photoCard = photos
    .map(photo => {
      return `<a class="gallery__link" href="${photo.largeImageURL}">
      <div class="photo-card">
         <img class="gallery-image" src="${photo.webformatURL}" alt="${photo.tags}" height="200" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b><br>
            <span>${photo.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b><br>
            <span>${photo.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b><br>
            <span>${photo.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b><br>
            <span>${photo.downloads}</span>
          </p>
        </div>
      </div></a>`;
    })
    .join(''));
  //{ webformatURL, largeImageURL, tags, likes, views, comments, downloads } = photos;
  return photoCard;
};

function onClickSearch(event) {
  event.preventDefault();

  // Удаляем предыдущие картинки
  if (document.querySelectorAll('.gallery__link').length > 0)
    for (const variable of document.querySelectorAll('.gallery__link')) {
      // тіло циклу
      variable.remove();
    }

  pageNum = 1;

  fetchSearchPhoto(inputText.value, pageNum).then(photos =>
  {
    elGallery.insertAdjacentHTML('beforeend', photos);
    gallery.refresh();

    timerId = setInterval(() => {
      const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();
      
      console.log(document.documentElement.scrollHeight);
      console.log(document.documentElement.scrollTop);
    window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
  }, 2000);
    
}
  );
}

function onLoadMore(event) {
  contLoadMore.style.display = 'none';

  pageNum = pageNum + 1;
  
 // console.log(`Text= ${inputText.value} page=${pageNum}`);

  fetchSearchPhoto(inputText.value, pageNum).then(photos =>
    elGallery.insertAdjacentHTML('beforeend', photos)
  );
}


