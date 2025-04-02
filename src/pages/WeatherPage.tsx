
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCityWeather } from '@/store/weatherSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WeatherCard from '../components/weather/WeatherCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const WeatherPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cities, loading, error } = useSelector((state: RootState) => state.weather);
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences);
  
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Load weather for favorite cities if not already loaded
    if (cities.length === 0) {
      favoriteCities.forEach(city => {
        dispatch(fetchCityWeather(city));
      });
    }
  }, [dispatch, cities.length, favoriteCities]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(fetchCityWeather(searchQuery.trim()));
      setSearchQuery('');
    }
  };
  
  // Filter cities based on search query
  const filteredCities = searchQuery
    ? cities.filter(city => 
        city.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cities;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Weather</h1>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a city..."
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
          {loading && cities.length === 0 ? (
            // Loading state
            Array(3).fill(null).map((_, index) => (
              <div key={index} className="h-64 loading-pulse rounded-lg"></div>
            ))
          ) : filteredCities.length > 0 ? (
            // Display weather cards
            filteredCities.map(city => (
              <WeatherCard key={city.cityId} weather={city} />
            ))
          ) : (
            // No results
            <div className="col-span-full text-center p-8 bg-card rounded-lg">
              <p className="text-muted-foreground">
                {searchQuery ? 'No cities found matching your search.' : 'No weather data available.'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WeatherPage;
