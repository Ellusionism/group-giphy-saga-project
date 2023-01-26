import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import App from './components/App/App';


const searchResults = (state = [], action) =>{
    switch (action.type) {
        case 'SET_RESULTS': 
        return action.payload
        default: 
        return state; 
    }
};

function* fetchResults(){
    try {
        const response = yield axios({
            method: 'GET',
            url: `/search/:${searchTerms}` // find a way to insert searchTerm 
        })
    } catch {

    }
}



















ReactDOM.render(<App />, document.getElementById('root'));
