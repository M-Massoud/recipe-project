// in parcrl add url: for any static assets which isn't programming files
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import model

import * as model from './model.js';

// import views
import { recipeView } from './views/recipeView.js';
import { resultsView } from './views/resultsView.js';
import { paginationView } from './views/paginationView.js';
import { bookmarksView } from './views/bookmarksView.js';
import { addnewRecipe } from './views/addNewRecipe.js';

const recipeContainer = document.querySelector('.recipe');
const searchEl = document.querySelector('.search');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

// start the application

// send ajax call and get the response and show the response date on the console

// loading recipe

const getRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // render spinner
    recipeView._renderSpinner();

    // load the recipe
    await model.getRecipeData(id);
    const { recipe } = model.state;
    recipeView._renderRecipe(recipe);

    // displaying the recipe
  } catch (err) {
    console.log(err);
    // alert(err.message);
    recipeView.renderError();
  }
};

// search results

const getSearchResults = async function () {
  // the search query
  model.state.search.query = document.querySelector('.search__field').value;

  try {
    if (!model.state.search.query) return;

    // the spinner
    resultsView._renderSpinner();
    // load the search results
    await model.getSearchResultsData(model.state.search.query);
    console.log(model.state.search.results);

    // the paginaton results
    // resultsView._renderRecipe(model.state.search.results);
    resultsView._renderRecipe(model.getSearchResultsPage());

    // the pagination buttons
    paginationView._renderRecipe(model.state.search);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

// window.addEventListener('hashchange', getRecipe);
// window.addEventListener('load', getRecipe);

const paginationBtnsClicked = function (gotoPage) {
  // show New results
  resultsView._renderRecipe(model.getSearchResultsPage(gotoPage));

  // Show New pagination buttons
  paginationView._renderRecipe(model.state.search);
};

// implement change the servings function
const controlServings = function (newServings) {
  // update the servings in the state
  model.updateServings(+newServings);

  // update the dom with the new servings
  recipeView._renderRecipe(model.state.recipe);
};

// add the bookmarks controller
const bookmarkController = function (recipe) {
  if (!model.state.recipe.bookmarked) model.addBokkmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView._renderRecipe(model.state.recipe);

  // render the bookmarks
  bookmarksView._renderRecipe(model.state.bookmarks);
};

// implement the subscribe puplisher design pattern

const initFun = function () {
  // this render bookmarks should be called first because without calling it here it's not called untill we remove or add a new bookmark
  bookmarksView._renderRecipe(model.state.bookmarks);
  recipeView.addHandlerRender(getRecipe);
  recipeView.addBookmarkHandler(bookmarkController);
  recipeView.updateServingsHandelr(controlServings);
  paginationView.addHandlerClick(paginationBtnsClicked);
};

initFun();

// load the search results data after submit
searchEl.addEventListener('submit', function (e) {
  model.state.search.searchPage = 1;
  e.preventDefault();
  getSearchResults();
});

// app notes
/*
don't forget that type module that i added for the hot reloading in the index.html file
*/
