export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    searchPage: 1,
  },
  bookmarks: [],
};

export const getRecipeData = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    if (!res.ok) {
      throw new Error(`we can't find the required recipe`);
    }

    const recipedData = await res.json();
    const { recipe } = recipedData.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    // check whether it's bookmarked or not
    if (state.bookmarks.some(bookmarkel => bookmarkel.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.log(err);
    // alert(err.message);
  }
};

// implement the search results

// send ajax call and get the data then save it and then show it in the console

export const getSearchResultsData = async function (query) {
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );

    const resData = await res.json();
    const searchResultsData = resData.data.recipes;

    state.search.results = searchResultsData.map(function (result) {
      return {
        id: result.id,
        title: result.title,
        publisher: result.publisher,
        image: result.image_url,
      };
    });

    // console.log(resData);
    // console.log(searchResultsData);
    // console.log(state.search.results);

    if (!resData.results) {
      throw new Error(`we can't find the required recipes`);
    }
  } catch (err) {
    console.log(err);
  }
};

// the paginaton

export const getSearchResultsPage = function (page = state.search.searchPage) {
  state.search.searchPage = page;
  const start = (page - 1) * 10; //0
  const end = page * 10; //10;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // newQt = oldQt * newServings/oldServings
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = ing.quantity * (newServings / state.recipe.servings);
  });
  state.recipe.servings = newServings;
  console.log(state.recipe);
};

// implement the local storage functionality

const saveBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// adding the bookmark functoinality

export const addBokkmark = function (recipe) {
  // add the recipe to the bookmarks array
  state.bookmarks.push(recipe);

  // add bookmarked to the recipe
  // if (recipe.id === state.recipe.id) {
  //   state.recipe.bookmarked = true;
  //   console.log(state.recipe);
  // }
  recipe.bookmarked = true;
  console.log(state.recipe);
  console.log(state.bookmarks);
  saveBookmarks();
};

export const removeBookmark = function (id) {
  //  removeBookmark from the bookmarks array
  const index = state.bookmarks.findIndex(function (el) {
    el.id === id;
  });
  state.bookmarks.splice(index, 1);

  // change the bookmarked to false
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  saveBookmarks();
};

const getOldBookmarks = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

getOldBookmarks();
console.log(state.bookmarks);
