import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import localStorage from "redux-persist/es/storage";
import userReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage: localStorage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
