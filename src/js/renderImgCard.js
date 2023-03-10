const gallery = document.querySelector('.gallery');

export default function renderImgCard(image) {
    const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
    const card = `
        <div class="photo-card">
            <a class="photo-link" href=${largeImageURL}><img src="${webformatURL}" alt="${tags}" class="gallery-photo" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                </p>
            </div>
        </div>`;
    gallery.insertAdjacentHTML("beforeend", card);
}