
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchCryptos } from '@/store/cryptoSlice';
import CryptoCard from './CryptoCard';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/store';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

const CryptoSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptos, loading, error } = useSelector((state: RootState) => state.crypto);
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences);
  
  useEffect(() => {
    dispatch(fetchCryptos());
  }, [dispatch]);
  
  // Function to refresh crypto data
  const handleRefresh = () => {
    dispatch(fetchCryptos());
  };
  
  // Filter cryptos to show only favorites or first 3 if no favorites
  const filteredCryptos = cryptos.filter(crypto => 
    favoriteCryptos.includes(crypto.id)
  ).slice(0, 3);
  
  // If no favorites, show first 3 cryptos
  const displayCryptos = filteredCryptos.length > 0 ? filteredCryptos : cryptos.slice(0, 3);
  
  return (
    <section className="data-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Cryptocurrency</h2>
        <div className="flex space-x-2">
          <Button onClick={handleRefresh} size="sm" variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button asChild size="sm">
            <Link to="/crypto">View All</Link>
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {loading && cryptos.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 loading-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayCryptos.length > 0 ? (
            displayCryptos.map(crypto => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-card rounded-lg">
              <p className="text-muted-foreground">No cryptocurrency data available.</p>
              <Button onClick={handleRefresh} className="mt-4">
                Load Cryptocurrency Data
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default CryptoSection;
