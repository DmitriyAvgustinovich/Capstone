import { applyMiddleware, compose, createStore } from "redux";
import { rootReducer } from "./root-reducer";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import logger from "redux-logger";
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from "./root-saga";

const persistConfig = {
  key: 'root',
  storage,
  whiteList: ['cart'],
}

const sagaMiddleware = createSagaMiddleware()

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_DEV !== 'production' &&
  logger, sagaMiddleware].filter(Boolean)

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose

const composeEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = createStore(
  persistedReducer,
  undefined,
  composeEnhancers
)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)