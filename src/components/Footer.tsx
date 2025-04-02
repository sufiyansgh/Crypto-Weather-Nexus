
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border py-6 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CryptoWeather Nexus. All rights reserved.
          </p>
          
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Data provided by OpenWeatherMap, CoinGecko, and NewsData.io
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
