// npm install axios
// npm install slim-select
// npm i notiflix
// https://pixabay.com/api/docs/
// 39839369-8c713c9a2c0ac40d1d76da13a

// https://pixabay.com/api/?key=39839369-8c713c9a2c0ac40d1d76da13a&q=yellow+flowers&image_type=photo

import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '39839369-8c713c9a2c0ac40d1d76da13a';

const elForm = document.querySelector(".search-form");

elForm.addEventListener('submit', onClickSearch);

//Объвление асинхронной функции
 const fetchSearchPhoto = async (input) => {
        const response = await axios.get(`${BASE_URL}?key=${KEY_API}&q=${input}&image_type=photo`);
  const photos = await response.data.hits;
     //return { webformatURL, largeImageURL, tags, likes, views, comments, downloads} = photos;
     return photos;
    }

function onClickSearch(event)
{
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.elements.searchQuery.value;
    //console.log(input);

   fetchSearchPhoto(input).then(photos => console.log(photos));

}


