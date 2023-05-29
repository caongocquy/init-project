import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

// config storage
const persistConfig = {
  key: 'root',
  // transforms: [immutableTransform()],
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();

export default () => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // create store
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      // other store enhancers if any
    ),
  );
  // const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));
  // create store with save storage
  let persistor = persistStore(store);

  // create saga
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
