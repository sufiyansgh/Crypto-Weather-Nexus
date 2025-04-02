
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCryptos } from '@/store/cryptoSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CryptoCard from '../components/crypto/CryptoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const CryptoPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptos, loading, error } = useSelector((state: RootState) => state.crypto);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  useEffect(() => {
    // Load crypto data if not already loaded
    if (cryptos.length === 0) {
      dispatch(fetchCryptos());
    }
  }, [dispatch, cryptos.length]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we might call an API to search
    // Here we just filter the existing data
  };
  
  const handleRefresh = () => {
    dispatch(fetchCryptos());
  };
  
  // Filter cryptocurrencies based on search query
  const filteredCryptos = searchQuery
    ? cryptos.filter(crypto => 
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cryptos;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Cryptocurrencies</h1>
          <Button onClick={handleRefresh} variant="outline">
            Refresh Data
          </Button>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search cryptocurrencies..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && cryptos.length === 0 ? (
            // Loading state
            Array(6).fill(null).map((_, index) => (
              <div key={index} className="h-64 loading-pulse rounded-lg"></div>
            ))
          ) : filteredCryptos.length > 0 ? (
            // Display crypto cards
            filteredCryptos.map(crypto => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))
          ) : (
            // No results
            <div className="col-span-full text-center p-8 bg-card rounded-lg">
              <p className="text-muted-foreground">
                {searchQuery ? 'No cryptocurrencies found matching your search.' : 'No cryptocurrency data available.'}
              </p>
              <Button onClick={handleRefresh} className="mt-4">
                Refresh Data
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CryptoPage;
