
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '@/store/weatherSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleFavoriteCity } from '@/store/userPreferencesSlice';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const dispatch = useDispatch();
  const { favoriteCities } = useSelector((state: RootState) => state.userPreferences);
  const isFavorite = favoriteCities.includes(weather.city);
  
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavoriteCity(weather.city));
  };
  
  return (
    <Link to={`/weather/${weather.cityId}`} className="block">
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">{weather.city}, {weather.country}</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleFavorite}
              className={isFavorite ? 'text-red-500' : 'text-muted-foreground'}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="flex-1">
              <div className="text-3xl font-bold">{Math.round(weather.temperature)}°C</div>
              <div className="text-sm text-muted-foreground">Feels like: {Math.round(weather.feelsLike)}°C</div>
              <div className="text-sm capitalize">{weather.description}</div>
            </div>
            <div className="flex-shrink-0">
              <img 
                src={getWeatherIconUrl(weather.icon)} 
                alt={weather.description}
                className="w-16 h-16"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Humidity: </span>
              {weather.humidity}%
            </div>
            <div>
              <span className="text-muted-foreground">Wind: </span>
              {weather.windSpeed} m/s
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WeatherCard;
