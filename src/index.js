import "./css/main.css";
import { addMarkup, resultBlock, loadMoreBtn } from "./markup";
import { getRequest, fetchMore } from "./getRequest";

import { Notify } from 'notiflix/build/notiflix-notify-aio';


const searchPicForm = document.querySelector('#search-form');

let query = '';

searchPicForm.addEventListener("submit", onSearchSubmit);
loadMoreBtn.addEventListener("click", onMoreLoad);

function onSearchSubmit(event) {
    query = '';
    resultBlock.innerHTML = '';
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

    getRequest(query).then(addMarkup);
   }

function onMoreLoad(e) {
    e.preventDefault();
    fetchMore(query).then(cards => {
    addMarkup(cards);

    if (cards.length === 0) {
        loadMoreBtn.classList.add('is-hidden');
    }
    });
}
