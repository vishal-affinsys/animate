import {configureStore, combineReducers} from '@reduxjs/toolkit';
import MessageReducer from './Reducers/BroadcastListener';

const reducer = combineReducers({
  message: MessageReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
