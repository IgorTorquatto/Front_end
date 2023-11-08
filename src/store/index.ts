import { configureStore, Store } from "@reduxjs/toolkit";
import rootReducer from "./ducks/rootReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./ducks/rootSaga";
import { CarsState } from "./ducks/cars/types";
import { idsState } from "./ducks/ids/types";
import { TokenState } from "./ducks/tokens/types";

const persistConfig = {
  key: "root",
  storage,
};

export interface ApplicationState {
  cars: CarsState
  tokens: TokenState
  ids: idsState
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<ApplicationState> = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
export { persistor, store };
