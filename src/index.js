import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import axios from "axios";
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import App from "./components/App/App";

//saga generator functions

//get search results from giphy api
function* fetchResults(action) {
  try {
    const response = yield axios({
      method: "GET",
      url: `/search/${action.payload}`, // find a way to insert searchTerm
    })
    yield put({
        type: 'SET_RESULTS',
        payload: response.data.data
      })
  } catch (error) {
    console.log("fetchResults fail:", error);
  }
}

//get liked gifs from database
function* fetchLikes() {
  try {
    const response = yield axios({
      method: 'GET',
      url: "/api/favorite",
    });
    yield put({
        type: 'SET_LIKES',
        payload: response.data
      })
  } catch (error) {
    console.log("fetchLikes fail:", error);
  }
}

function* addToLikes(action) {
  try {
    let gif = action.payload;
    console.log(gif);
    const response = axios({
      method: "POST",
      url: '/api/favorite',
      data: {
        url: gif.url,
        title: gif.title
      }
    })
    yield put({
      type: 'UPDATE_LIKES',
    })
  } catch (error) {
    console.error('Error in addToLikes (index.js):', error);
  }
}

//get category list from database
function* fetchCategory (){
     try {
        const response = yield axios ({
            method: 'GET', 
            url: '/api/category'
        })
        yield put({
            type: 'SET_CATEGORY',
            payload: response.data
          })
     } catch (error) {
        console.log('fetchCategory fail:', error);
      }
}

//rootSaga function
function* rootSaga(){
  yield takeEvery('SAGA/FETCH_RESULTS', fetchResults);
  yield takeEvery('SAGA/FETCH_LIKES', fetchLikes);
  yield takeEvery('SAGA/FETCH_CATEGORY', fetchCategory);
  yield takeEvery('SAGA/ADD_TO_LIKES', addToLikes);
}

//create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//redux reducers

const searchResults = (state = [], action) => {
  switch (action.type) {
    case "SET_RESULTS":
      return action.payload;
    default:
      return state;
  }
};

const searchTerm = (state = "", action) => {
  switch (action.type) {
    case "SET_TERM":
      return action.payload;
    default:
      return state;
  }
};

const likeList = (state = [], action) => {
  switch (action.type) {
    case "SET_LIKES":
      return action.payload;
      break;
    case 'UPDATE_LIKES':
      return [...state, action.payload];
      break;
    default:
      return state;
  }
};

const likeCategory = (state = "", action) => {
  switch (action.type) {
    case "SET_LIKE_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

const categoryList = (state = [], action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return action.payload;
    default:
      return state;
  }
};

//create reduxStore
const store = createStore(combineReducers({
  searchResults, searchTerm, likeList, likeCategory, categoryList
}), applyMiddleware(sagaMiddleware, logger))

//pass rooSaga to middleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById("root"));
