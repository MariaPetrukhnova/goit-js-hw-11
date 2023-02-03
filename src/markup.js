import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const resultBlock = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

export { makeMarkup, addMarkup, resultBlock, loadMoreBtn, gallery }



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



resultBlock.addEventListener('click', (event) => {
    event.preventDefault();
    if (!event.target.classList.contains('photo')) return;
    gallery.on('show.simplelightbox', gallery.open());
});

    
function makeMarkup(arr) {
    const newMarkup = arr.map(el => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
        return `
        <a href="${largeImageURL}">
            <div class="photo-card">                
                    <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy">
                </a>
                <div class="info">
                    <p class="info-item"> Likes:
                    <b> ${likes}</b>
                    </p>
                    <p class="info-item"> Views:
                    <b> ${views}</b>
                    </p>
                    <p class="info-item"> Comments:
                    <b> ${comments}</b>
                    </p>
                    <p class="info-item"> Downloads:
                    <b> ${downloads}</b>
                    </p>
                </div>
            </div>
        </a>
        `
    });
    return newMarkup.join('');
}



function addMarkup(markup) {
    resultBlock.innerHTML += makeMarkup(markup);
    gallery.refresh();
  loadMoreBtn.classList.remove('is-hidden');
  return resultBlock;
  }