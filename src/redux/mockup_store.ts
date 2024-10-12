import { configureStore } from '@reduxjs/toolkit';

import mockupRootReducer from './mockup_root_reducer';



const store = configureStore({
    reducer: mockupRootReducer,
});



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const setupMockupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mockupRootReducer,
    preloadedState
  })
}
export { store };
export type AppStore = ReturnType<typeof setupMockupStore>
