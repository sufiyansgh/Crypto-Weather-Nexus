
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCryptoData, fetchCryptoDetail } from '../api/cryptoApi';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  price: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}

export interface CryptoDetailData extends CryptoData {
  high24h: number;
  low24h: number;
  circulatingSupply: number;
  totalSupply: number;
  allTimeHigh: number;
  allTimeHighDate: string;
  description?: string;
}

interface CryptoState {
  cryptos: CryptoData[];
  cryptoDetails: Record<string, CryptoDetailData>;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

const initialState: CryptoState = {
  cryptos: [],
  cryptoDetails: {},
  loading: false,
  detailLoading: false,
  error: null,
};

// Thunk to fetch all cryptocurrencies
export const fetchCryptos = createAsyncThunk(
  'crypto/fetchCryptos',
  async () => {
    const response = await fetchCryptoData();
    return response;
  }
);

// Thunk to fetch detailed data for a specific cryptocurrency
export const fetchCryptoDetails = createAsyncThunk(
  'crypto/fetchCryptoDetails',
  async (cryptoId: string) => {
    const response = await fetchCryptoDetail(cryptoId);
    return response;
  }
);

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoPrice: (state, action: PayloadAction<{ id: string; price: number }>) => {
      const { id, price } = action.payload;
      const crypto = state.cryptos.find(c => c.id === id);
      if (crypto) {
        crypto.price = price;
        crypto.lastUpdated = new Date().toISOString();
      }
      
      // Also update in details if exists
      if (state.cryptoDetails[id]) {
        state.cryptoDetails[id].price = price;
        state.cryptoDetails[id].lastUpdated = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptos.fulfilled, (state, action) => {
        state.loading = false;
        state.cryptos = action.payload;
      })
      .addCase(fetchCryptos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cryptocurrency data';
      })
      .addCase(fetchCryptoDetails.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchCryptoDetails.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.cryptoDetails[action.payload.id] = action.payload;
      })
      .addCase(fetchCryptoDetails.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message || 'Failed to fetch cryptocurrency details';
      });
  },
});

export const { updateCryptoPrice } = cryptoSlice.actions;
export default cryptoSlice.reducer;
