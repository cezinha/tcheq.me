import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { symptomsReducer } from './reducers/symptoms';
import { loadState, saveState } from '../localstorage';
import throttle from 'lodash.throttle';
import thunk from 'redux-thunk';
import { formReducer } from './reducers/form';
import { contactReducer } from './reducers/contact';
import { locationReducer } from './reducers/location';

export const rootReducer = combineReducers({
  symptoms: symptomsReducer,
  form: formReducer,
  contact: contactReducer,
  location: locationReducer
});
export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch;
//const composeEnhancers = composeWithDevTools({ realtime: true });

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
/*const composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;*/
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);
const persistedState = loadState();
export const store = createStore(rootReducer, persistedState, enhancer);

store.subscribe(throttle(() => {
  saveState({
    symptoms: store.getState().symptoms,
    form: store.getState().form,
    contact: store.getState().contact,
    location: store.getState().location
  });
}, 1000));