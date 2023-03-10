import { Notify } from "notiflix";
const axios = require('axios').default;

let page = 1;
let limit = 40;

const API_KEY = '33283297-a16e2a82cec1eccc6e35e3730';
const BASE_URL = 'https://pixabay.com/api/';
const URL_OPTIONS = `image_type=photo&orientation=horizontal&safesearch=true&per_page=${limit}`;
  
async function getRequest(request) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${request}&${URL_OPTIONS}&page=${page=1}`);
    if (response.ok === false) {
        throw new Error('Such a request has not been found');
    }

    if (!response.data) {
      Notify.failure("Ops");
      return {};
    }

    if (response?.data?.hits?.length === 0) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    }

    return response.data;
  }
  catch (error) {
    return null;
  }
}
 
async function fetchMore(request) {
  try {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${request}&${URL_OPTIONS}&page=${page += 1}`);
    if (response.ok === false) {
      throw new Error('Such a request has not been found');
    }
    
    if (!response.data) {
      Notify.failure("Ops");
      return {};
    }

    if (response?.data?.hits?.length === 0) {
      console.log(cardsArr.length);
      Notify.failure("We're sorry, but you've reached the end of search results.");
    } else {
      Notify.info(`Hooray! We found ${response.data.totalHits} images.`);
    }

    return response.data;
  } catch (error) {
    return null;
  }
}

export { getRequest, fetchMore };
