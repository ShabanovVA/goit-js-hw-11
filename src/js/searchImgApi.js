import axios from "axios";

export default class SearchImgApi {
    constructor() {
        this.baseURL = 'https://pixabay.com/api/';
        this.apiKEY = '33744898-780f39bcdd67c478afa941924';
        this.searchWord = '';
        this.imageType = 'photo';
        this.orientation = 'horizontal';
        this.safeSearch = true;
        this.page = 1;
        this.perPage = 40;
    }

    async getImages() {
        const requestUrl = `${this.baseURL}?key=${this.apiKEY}&q=${this.searchWord}&image_type=${this.imageType}&orientation=${this.orientation}&safesearch=${this.safeSearch}&page=${this.page}&per_page=${this.perPage}`;
        return await axios.get(requestUrl)
            .then(response => {
                if (response.status !== 200 || response.data.hits.length === 0) {
                    throw new Error(response.status)
                }
                this.nextPage();
                return response.data;
            })
    }

    nextPage() {
        this.page += 1;
    }

    resetNumberPage() {
        this.page = 1;
    }

    changeSearchWord(newSerchWord) {
        this.searchWord = newSerchWord;
    }
}

