// npm install axios
// npm install slim-select
// npm i notiflix
// https://pixabay.com/api/docs/
// 39839369-8c713c9a2c0ac40d1d76da13a

// https://pixabay.com/api/?key=39839369-8c713c9a2c0ac40d1d76da13a&q=yellow+flowers&image_type=photo

import Notiflix from 'notiflix';
import axios from 'axios';
import { galleryItems } from './gallery-items.js';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '39839369-8c713c9a2c0ac40d1d76da13a';

const elForm = document.querySelector('.search-form');
const elGallery = document.querySelector('.gallery');

elForm.addEventListener('submit', onClickSearch);

//Объвление асинхронной функции
const fetchSearchPhoto = async input => {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${input}&image_type=photo`
  );
  const photos = await response.data.hits;
  return (photoCard = photos
    .map(photo => {
      return `<div class="photo-card">
        <a class="gallery__link" href="${photo.largeImageURL}"> <img src="${photo.webformatURL}" alt="${photo.tags}" height="200" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <span>${photo.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b>
            <span>${photo.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <span>${photo.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <span>${photo.downloads}</span>
          </p>
        </div>
      </div>`;
    })
    .join(''));
  //{ webformatURL, largeImageURL, tags, likes, views, comments, downloads } = photos;
  return photoCard;
};

function onClickSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = form.elements.searchQuery.value;
  //console.log(input);

  fetchSearchPhoto(input).then(photos =>
    elGallery.insertAdjacentHTML('beforeend', photos)
  );
}

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
