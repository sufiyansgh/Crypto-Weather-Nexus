
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCryptoNews } from '../api/newsApi';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  imageUrl?: string;
}

interface NewsState {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async () => {
    const response = await fetchCryptoNews();
    return response;
  }
);

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      });
  },
});

export default newsSlice.reducer;
