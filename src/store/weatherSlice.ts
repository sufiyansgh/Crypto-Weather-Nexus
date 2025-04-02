
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchWeatherForCity } from '../api/weatherApi';

export interface WeatherData {
  cityId: string;
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  lastUpdated: string;
}

interface WeatherState {
  cities: WeatherData[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

// Thunk to fetch weather for a city
export const fetchCityWeather = createAsyncThunk(
  'weather/fetchCityWeather',
  async (cityName: string) => {
    const response = await fetchWeatherForCity(cityName);
    return response;
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    weatherAlertReceived: (state, action: PayloadAction<{ cityId: string; alert: string }>) => {
      // Handle weather alerts from WebSocket or other sources
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCityWeather.fulfilled, (state, action) => {
        state.loading = false;
        
        // Check if city already exists, then update or add
        const existingCityIndex = state.cities.findIndex(
          (city) => city.cityId === action.payload.cityId
        );
        
        if (existingCityIndex !== -1) {
          state.cities[existingCityIndex] = action.payload;
        } else {
          state.cities.push(action.payload);
        }
      })
      .addCase(fetchCityWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch weather data';
      });
  },
});

export const { weatherAlertReceived } = weatherSlice.actions;
export default weatherSlice.reducer;
