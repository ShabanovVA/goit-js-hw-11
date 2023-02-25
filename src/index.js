import SearchImgApi from "./js/searchImgApi";
import { Notify } from "notiflix";
import renderImgCard from "./js/renderImgCard";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById('search-form');
const input = document.querySelector('[name="searchQuery"]');
const loadMoreBtn = document.querySelector('.load-more');
const upBtn = document.querySelector('.up');
const searchImgClass = new SearchImgApi();
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreImg);
upBtn.addEventListener('click', onUp);

let lightbox = new SimpleLightbox('.photo-card a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

function onFormSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';

  searchImgClass.resetNumberPage();
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
        upBtnShow();
      })
      .catch(error => {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      })
  } else {
        loadMoreBtnHide();
    upBtnHide();
    Notify.info("Please enter new search query.")

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
  loadMoreBtn.style.display = 'none';
}

function loadMoreBtnShow() {
  loadMoreBtn.style.display = 'block';
}

function onUp() {
  window.scrollTo( 0, 0)
}

function upBtnShow() {
  upBtn.style.display = 'block';
}

function upBtnHide() {
  upBtn.style.display = 'none';
}