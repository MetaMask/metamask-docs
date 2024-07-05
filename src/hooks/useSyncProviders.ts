import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useSyncProviders = ()=> useSyncExternalStore(store.subscribe, store.value, store.value)