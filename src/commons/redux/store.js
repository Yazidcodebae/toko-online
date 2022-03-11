import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";
import { tokenInterceptor } from "./middleware";
import { rootReducer } from "./reducer";
import { rootSaga } from "./saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [tokenInterceptor, sagaMiddleware],
  devTools: true,
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
