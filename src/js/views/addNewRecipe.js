// add new recipe popup

// import icons
import icons from 'url:../../img/icons.svg';

// import the parent class
import View from './view.js';

class AddNewRecipe extends View {
  constructor() {
    super();

    this.parentElement = document.querySelector('.upload');
    this._showAddRecipeWindow();
    this._hideAddrecipeWindow();
    this._submitNewRecipeDate();
  }

  _showAddRecipeWindow() {
    const btnOpenWindow = document.querySelector('.nav__btn--add-recipe');
    btnOpenWindow.addEventListener('click', function () {
      document.querySelector('.overlay').classList.toggle('hidden');
      document.querySelector('.add-recipe-window').classList.toggle('hidden');
    });
  }

  _hideAddrecipeWindow() {
    const btnCloseWindow = document.querySelector('.btn--close-modal');
    btnCloseWindow.addEventListener('click', function () {
      document.querySelector('.overlay').classList.toggle('hidden');
      document.querySelector('.add-recipe-window').classList.toggle('hidden');
    });

    const overlayCloseWindow = document.querySelector('.overlay');
    overlayCloseWindow.addEventListener('click', function () {
      document.querySelector('.overlay').classList.toggle('hidden');
      document.querySelector('.add-recipe-window').classList.toggle('hidden');
    });
  }

  _submitNewRecipeDate() {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const recipeData = [...new FormData(document.querySelector('.upload'))];
      const recipeDataObj = Object.fromEntries(recipeData);
      console.log(recipeData);
      console.log(recipeDataObj);
    });
  }
}

export const addnewRecipe = new AddNewRecipe();
