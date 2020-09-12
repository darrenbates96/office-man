import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import officesReducer from "./reducers/officesReducer";
import employeesReducer from "./reducers/employeesReducer";

// Using redux-thunk as middleware to allow use of
// action creators and thus allow for asynchronous actions

const store = createStore(
    combineReducers({
        offices: officesReducer,
        employees: employeesReducer,
    }),
    applyMiddleware(thunk)
);

export default store;
