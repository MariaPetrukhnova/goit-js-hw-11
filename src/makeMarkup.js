const resultBlock = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

export { makeMarkup, addMarkup, resultBlock, loadMoreBtn }
    
function makeMarkup(arr) {
    const newMarkup = arr.map(el => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
        return `
            <div class="photo-card">
                <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy">
                <div class="info">
                    <p class="info-item">
                    <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                    </p>
                </div>
            </div>`
    });
    return newMarkup.join('');
}

function addMarkup(markup) {
  resultBlock.innerHTML += makeMarkup(markup);
  loadMoreBtn.classList.remove('is-hidden');
  return resultBlock;
  }