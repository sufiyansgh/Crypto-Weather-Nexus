
import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice } from './weatherSlice';
import { cryptoSlice } from './cryptoSlice';
import { newsSlice } from './newsSlice';
import { userPreferencesSlice } from './userPreferencesSlice';

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
    crypto: cryptoSlice.reducer,
    news: newsSlice.reducer,
    userPreferences: userPreferencesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
