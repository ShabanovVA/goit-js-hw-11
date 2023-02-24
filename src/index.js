import SearchImgApi from "./js/searchImgApi";
import { Notify } from "notiflix";
import renderImgCard from "./js/renderImgCard";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById('search-form');
const input = document.querySelector('[name="searchQuery"]');
const loadMore = document.querySelector('.load-more');
const searchImgClass = new SearchImgApi();
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMoreImg);

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

function onFormSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';

  searchImgClass.resetPage();
  const inputValue = input.value;
  searchImgClass.changeSearchWord(inputValue);

  if (inputValue) {
    searchImgClass.getImages()
      .then(dataImages => {
        Notify.success(`Hooray! We found ${dataImages.totalHits} images`)
        dataImages.hits.map(item => {
          renderImgCard(item)
        })
        lightbox.refresh();
        loadMoreBtnShow();
      })
      .catch(error => {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      })
  } else {
        Notify.info("Please enter new search query")
  }
}

function onLoadMoreImg() {
  searchImgClass.getImages()
      .then(dataImages => {
        dataImages.hits.map(item => {
          renderImgCard(item)
        })
        lightbox.refresh();
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
            window.scrollBy({
              top: cardHeight * 2,
              behavior: "smooth",
            });
      })
      .catch(error => {
        Notify.info("We're sorry, but you've reached the end of search results.")
        loadMoreBtnHide();
      })
}

function loadMoreBtnHide() {
  loadMore.style.display = 'none';
}

function loadMoreBtnShow() {
  loadMore.style.display = 'block';
}
