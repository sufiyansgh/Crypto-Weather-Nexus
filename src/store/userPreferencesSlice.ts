
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  favoriteCities: string[];
  favoriteCryptos: string[];
  theme: 'dark' | 'light';
}

const getInitialState = (): UserPreferences => {
  // Try to load from localStorage if available
  if (typeof window !== 'undefined') {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        return JSON.parse(savedPreferences);
      } catch (e) {
        console.error('Failed to parse saved preferences', e);
      }
    }
  }
  
  // Default preferences
  return {
    favoriteCities: ['New York', 'London', 'Tokyo'],
    favoriteCryptos: ['bitcoin', 'ethereum', 'cardano'],
    theme: 'dark',
  };
};

export const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: getInitialState(),
  reducers: {
    toggleFavoriteCity: (state, action: PayloadAction<string>) => {
      const city = action.payload;
      if (state.favoriteCities.includes(city)) {
        state.favoriteCities = state.favoriteCities.filter(c => c !== city);
      } else {
        state.favoriteCities.push(city);
      }
      
      // Save to localStorage if available
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(state));
      }
    },
    toggleFavoriteCrypto: (state, action: PayloadAction<string>) => {
      const crypto = action.payload;
      if (state.favoriteCryptos.includes(crypto)) {
        state.favoriteCryptos = state.favoriteCryptos.filter(c => c !== crypto);
      } else {
        state.favoriteCryptos.push(crypto);
      }
      
      // Save to localStorage if available
      if (typeof window !== 'undefined') {
        localStorage.setItem('userPreferences', JSON.stringify(state));
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      
      // Apply theme class to document
      if (typeof window !== 'undefined') {
        if (state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        
        // Save to localStorage
        localStorage.setItem('userPreferences', JSON.stringify(state));
      }
    },
  },
});

export const { toggleFavoriteCity, toggleFavoriteCrypto, toggleTheme } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;
