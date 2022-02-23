// import icons
import icons from 'url:../../img/icons.svg';

// import the parent class
import View from './view.js';

class PaginatonView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.pagination');
  }

  _renderMarkup() {
    // the pagination logic
    // this.data is now refers to the entire search  object we passed

    const curPage = this.data.searchPage;
    const numPages = Math.ceil(this.data.results.length / 10);
    console.log(numPages);
    console.log(this.data.results.length);

    // if there is only 1 page of results
    if (numPages === 1) {
      return '';
    }

    // the first page of results of results
    else if (curPage === 1 && curPage < numPages) {
      return `
        <button data-goto="${curPage + 1}" 
          class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    // the last page of results
    else if (numPages > 1 && curPage === numPages) {
      return `
        <button data-goto="${curPage - 1}"
          class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${numPages - 1}</span>
        </button>`;
    }

    // other pages between the first and the last
    else if (numPages > 1 && curPage < numPages) {
      return `
         <button data-goto="${curPage - 1}" 
          class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${curPage + 1}" 
         class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>`;
    }
  }

  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btnClicked = e.target.closest('.btn--inline');
      if (!btnClicked) return;
      const gotoPage = +btnClicked.dataset.goto;
      console.log(btnClicked);
      console.log(gotoPage);
      handler(gotoPage);
    });
  }
}

export const paginationView = new PaginatonView();
