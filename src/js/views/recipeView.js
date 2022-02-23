// in parcrl add url: for any static assets which isn't programming files
// import icons
import icons from 'url:../../img/icons.svg';

// import the parent class
import View from './view.js';

class RecipeView extends View {
  constructor() {
    super();

    this.parentElement = document.querySelector('.recipe');
    // this.errorMessage = `Error happened! can't get the recipe please try another one`;
  }

  updateServingsHandelr(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const updateBtnClicked = e.target.closest('.btn--increase-servings');
      if (!updateBtnClicked) return;
      const updateTo = +updateBtnClicked.dataset.updateTo;
      console.log(updateBtnClicked);
      console.log(updateTo, typeof updateTo);
      if (updateTo > 0) handler(updateTo);
    });
  }

  addBookmarkHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const bookmarkBtn = e.target.closest('.btn--bookmark');
      if (!bookmarkBtn) return;
      handler();
    });
  }

  _renderMarkup() {
    return `
    <figure class="recipe__fig">
      <img src="${this.data.image}" alt="${
      this.data.title
    }" class="recipe__img" />
      <h1 class="recipe__title">
       <span>${this.data.title}</span>
      </h1>
    </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button data-update-to="${
          this.data.servings - 1
        }" class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-update-to='${
          this.data.servings + 1
        }' class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this.data.ingredients
      .map(function (ing) {
        return `<li class="recipe__ingredient">
   <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
   </svg>
   <div class="recipe__quantity">${ing.quantity} </div>
   <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
   </div>
   </li>`;
      })
      .join('')}
  
   </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  // implement the subscribe puplisher pattren

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }
}

export const recipeView = new RecipeView();
