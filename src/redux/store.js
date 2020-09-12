import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import officesReducer from './reducers/officesReducer';

// Using redux-thunk as middleware to allow use of 
// action creators and thus allow for asynchronous actions

const store = createStore(officesReducer, applyMiddleware(thunk));

export default store;