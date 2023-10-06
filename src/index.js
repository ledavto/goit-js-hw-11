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

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '39839369-8c713c9a2c0ac40d1d76da13a';
const IMG_KOL = 40;
let pageNum = 1;

const elForm = document.querySelector('.search-form');
const elBtn = document.querySelector('.load-more');
const elGallery = document.querySelector('.gallery');

elForm.addEventListener('submit', onClickSearch);
elBtn.addEventListener('click', onLoadMore);

//Объвление асинхронной функции
const fetchSearchPhoto = async (input, page) => {
  console.log(`Text= ${input} page=${page}`);
  const response = await axios.get(
    `${BASE_URL}?key=${KEY_API}&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${IMG_KOL}&page=${page}`
  );


  const photos = await response.data.hits;

  const totalImg = await response.data.totalHits;
  //console.log(totalImg);
  
  //Выводим сообщение о найденных FOTO
  if (totalImg > IMG_KOL * page) {
    Notiflix.Notify.success(`Hooray! We found ${page * IMG_KOL} of ${totalImg} images.`);
    elBtn.disabled = false;
  }
  else {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    elBtn.disabled = true;
  }
  
  return (photoCard = photos
    .map(photo => {
      return `<a class="gallery__link" href="${photo.largeImageURL}">
      <div class="photo-card">
         <img src="${photo.webformatURL}" alt="${photo.tags}" height="200" loading="lazy" />
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
      </div></a>`;
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

  // Удаляем предыдущие картинки
  if (document.querySelectorAll('.photo-card').length > 0)
    for (const variable of document.querySelectorAll('.photo-card')) {
      // тіло циклу
      variable.remove();
    }

  localStorage.setItem('gallery-input-str', input);
  localStorage.setItem('gallery-page-num', 1);

  fetchSearchPhoto(input, pageNum).then(photos =>
    elGallery.insertAdjacentHTML('beforeend', photos)
  );
}

function onLoadMore(event) {
  //event.preventDefault();
  //const form = event.currentTarget;
  const inputText = document.querySelector('input');

  //console.log(inputText.value);
  const getPageNum = Number(localStorage.getItem('gallery-page-num'))+1;
  
  console.log(getPageNum);
  localStorage.setItem('gallery-page-num', getPageNum);



  fetchSearchPhoto(inputText.value, getPageNum).then(photos =>
    elGallery.insertAdjacentHTML('beforeend', photos)
  );
}

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
