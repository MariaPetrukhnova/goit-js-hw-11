import "./css/main.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { makeMarkup } from "./markup";
import { getRequest, fetchMore } from "./getRequest";

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const searchPicForm = document.querySelector('#search-form');
const resultBlock = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let hitsCounter = 0;

const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    close: true,
    closeText: 'x',
    enableKeyboard:	true,
    docClose: true,
});        

resultBlock.addEventListener('click', initGallery);

let query = '';

searchPicForm.addEventListener("submit", onSearchSubmit);
loadMoreBtn.addEventListener("click", onMoreLoad);

function onSearchSubmit(event) {
    query = '';
    resultBlock.innerHTML = '';
    hitsCounter = 0;
    event.preventDefault();
    loadMoreBtn.classList.add('is-hidden');
    const {
        elements: { searchQuery }
    } = event.currentTarget;
    query = searchQuery.value.trim();

    if (query === '') {
        Notify.failure('Please enter anything');
        return;
    };

    getRequest(query).then((res) => {
        if (!res) {
            return
        }

        updateResultHtml(res.hits)
        toggleLoadMoreButton(res.hits.length, res.total);
    });
}

function initGallery(event) {
    event.preventDefault();
    if (!event.target.classList.contains('photo-link')) return;
    gallery.on('show.simplelightbox', gallery.open(event.target));
}

function updateResultHtml(cards) {
    resultBlock.removeEventListener('click', initGallery);
    resultBlock.innerHTML += makeMarkup(cards);
    gallery.refresh();
    resultBlock.addEventListener('click', initGallery);
}

function toggleLoadMoreButton(count, total) {
    hitsCounter += count;

    if (hitsCounter < total) {
        loadMoreBtn.classList.remove('is-hidden');
    } else {
        loadMoreBtn.classList.add('is-hidden');
    }
}

function onMoreLoad(e) {
    e.preventDefault();
    fetchMore(query).then(res => {
        updateResultHtml(res.hits)
        toggleLoadMoreButton(res.hits.length, res.total);
    });
}
