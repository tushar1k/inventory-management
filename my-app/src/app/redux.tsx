"use client";

import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";

import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import { persistStore, persistReducer } from "redux-persist";
import type { Persistor } from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* ---------------- SAFE STORAGE FOR NEXT.JS ---------------- */

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

/* ---------------- PERSIST CONFIG ---------------- */

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

/* ---------------- REDUCERS ---------------- */

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* ---------------- STORE ---------------- */

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(api.middleware),
  });
};

/* ---------------- TYPES ---------------- */

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* ---------------- PROVIDER ---------------- */

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current!}>
      <PersistGate loading={null} persistor={persistorRef.current!}>
        {children}
      </PersistGate>
    </Provider>
  );
}
