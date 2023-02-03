function makeMarkup(arr) {
    const newMarkup = arr.map(el => {
        const { id, webformatURL, largeImageURL, tags, likes, views, comments, downloads } = el;
        return `
            <div class="photo-card">
                <a href="${largeImageURL}" data-featherlight="#mylightbox-${id}" class="photo-link">
                    <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" id="#mylightbox-${id}">
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
        `
    });
    return newMarkup.join('');
}
  
export { makeMarkup }