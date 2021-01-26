import { applyMiddleware, combineReducers, createStore, Store } from "redux";
import thunk from "redux-thunk";
import { reduxReducer } from "../reducer/reducer";
import { routerReducer } from "react-router-redux";

export default function configureStore(): Store<any> {
  const store = createStore(
    combineReducers({
      reduxReducer,
      routing: routerReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
}
