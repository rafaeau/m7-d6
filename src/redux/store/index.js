import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import jobsReducer from '../reducers/jobsReducer'
import favoritesReducer from '../reducers/favoritesReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const composeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
  jobs: [],
  favorites: [],
}

const bigReducer = combineReducers({
  jobs: jobsReducer,
  favorites: favoritesReducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, bigReducer)

export let configureStore = createStore(
  persistedReducer,
  initialState,
  composeThatAlwaysWorks(applyMiddleware(thunk))
)

export const persistor = persistStore(configureStore)