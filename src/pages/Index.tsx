
import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WeatherSection from '../components/weather/WeatherSection';
import CryptoSection from '../components/crypto/CryptoSection';
import NewsSection from '../components/news/NewsSection';
import { startWebSocketConnection, startSimulatedWeatherAlerts } from '../api/websocketService';

const Index: React.FC = () => {
  useEffect(() => {
    // Start WebSocket connection for real-time crypto data
    startWebSocketConnection();
    
    // Start simulated weather alerts
    startSimulatedWeatherAlerts();
    
    // Clean up on unmount
    return () => {
      // No need to stop WebSocket on index unmount - we want it to stay connected
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 gap-8">
          <WeatherSection />
          <CryptoSection />
          <NewsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
