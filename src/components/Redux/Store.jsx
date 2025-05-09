import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./Slices/AuthSlice";
import signUpReducer from "./Slices/SignUpData";
import cartReducer from "./Slices/cartData";
import blogReducer from "./Slices/blogSlice";
import serviceReducer from "./Slices/serviceSlice";
import otherReducer from "./Slices/otherData";
import orderReducer from "./Slices/orderSlice";
import languageReducer from "./Slices/languageSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  cart: cartReducer,
  blog: blogReducer,
  service: serviceReducer,
  authother: otherReducer,
  orderData: orderReducer,
  language: languageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "signUp", "cart", "authother", "orderData", "language"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

persistStore(store);

export { store };
