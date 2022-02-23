// import icons
import icons from 'url:../../img/icons.svg';

// import the parent class

import View from './view.js';

class BookmarksView extends View {
  constructor() {
    super();
    this.parentElement = document.querySelector('.bookmarks');
    this.errorMessage = `no bookmarks yet! find a recipe and bookmark it`;
  }

  _renderMarkup() {
    // console.log(this.data);

    return this.data
      .map(function (result) {
        return `
        <ul class="results">
            <li class="preview">
              <a class="preview__link" href="#${result.id}">
                  <figure class="preview__fig">
                   <img src="${result.image}" alt="${result.title}" />
                  </figure>
                 <div class="preview__data">
                    <h4 class="preview__title">${result.title}</h4>
                    <p class="preview__publisher">${result.publisher}</p>
                    
                 </div>
              </a>
            </li>
        </ul>`;
      })
      .join('');
  }
}

export const bookmarksView = new BookmarksView();
// console.log(resultsView);
