// the parent class

// import icons
import icons from 'url:../../img/icons.svg';

export default class View {
  constructor() {
    this.errorMessage = `Error happened! can't get the recipe please try another one`;
  }

  _renderRecipe(data) {
    if (!data || data.length === 0) {
      return this.renderError();
    }
    this.data = data;
    const recipeMarkup = this._renderMarkup();
    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', recipeMarkup);
  }

  _renderSpinner() {
    // showing the spinner

    const spinnerMarkup = `
        <div class="spinner">
           <svg>
            <use href="${icons}#icon-loader"></use>
           </svg>
        </div>`;
    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }

  // render the error method
  renderError(err = this.errorMessage) {
    const errorMarkup = `
      <div class="error">
        <div>
            <svg>
              <use href="${icons}.svg#icon-alert-triangle"></use>
            </svg>
        </div>
        <p>${err}</p>
      </div>`;

    this.parentElement.innerHTML = '';
    this.parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }
}
