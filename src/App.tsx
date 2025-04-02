
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";

import Index from "./pages/Index";
import WeatherPage from "./pages/WeatherPage";
import WeatherDetailPage from "./pages/WeatherDetailPage";
import CryptoPage from "./pages/CryptoPage";
import CryptoDetailPage from "./pages/CryptoDetailPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";

// Initialize theme from localStorage or default to dark
const initializeTheme = () => {
  const savedPrefs = localStorage.getItem('userPreferences');
  
  if (savedPrefs) {
    try {
      const { theme } = JSON.parse(savedPrefs);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Failed to parse saved preferences for theme', e);
      // Default to dark theme if parsing fails
      document.documentElement.classList.add('dark');
    }
  } else {
    // Default to dark theme if no saved preferences
    document.documentElement.classList.add('dark');
  }
};

// Initialize theme before render
initializeTheme();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      staleTime: 60000, // 1 minute
    },
  },
});

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/weather/:cityId" element={<WeatherDetailPage />} />
            <Route path="/crypto" element={<CryptoPage />} />
            <Route path="/crypto/:cryptoId" element={<CryptoDetailPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
