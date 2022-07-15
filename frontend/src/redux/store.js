import { createStore } from "redux";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import rootReducer from "./reducers";

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const persistConfig = { key: 'key', storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


// export const getState = () => {
//     return store.getState();
// }


export default store;