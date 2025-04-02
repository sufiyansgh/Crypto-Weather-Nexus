
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCityWeather } from '@/store/weatherSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, Wind, Droplets, Gauge, Eye } from 'lucide-react';
import { toast } from 'sonner';

const WeatherDetailPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  
  const { cities } = useSelector((state: RootState) => state.weather);
  const cityData = cities.find(city => city.cityId === cityId);
  
  useEffect(() => {
    // If we have the city name but not the data, fetch it
    if (cityData) {
      // Refresh the data
      setLoading(true);
      dispatch(fetchCityWeather(cityData.city))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [dispatch, cityId, cityData]);
  
  // Function to refresh the data
  const handleRefresh = () => {
    if (cityData) {
      setLoading(true);
      dispatch(fetchCityWeather(cityData.city))
        .then(() => {
          setLoading(false);
          toast.success(`Weather data for ${cityData.city} updated`);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(`Failed to update weather data: ${error.message}`);
        });
    }
  };
  
  // Format the timestamp
  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };
  
  // Get weather icon URL
  const getWeatherIconUrl = (iconCode: string) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };
  
  if (!cityData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4">
          <Link to="/weather">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Weather
            </Button>
          </Link>
          
          <div className="text-center p-12">
            <h1 className="text-3xl font-bold mb-4">City Not Found</h1>
            <p className="text-muted-foreground mb-8">The city you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/weather">View All Cities</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link to="/weather">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Weather
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            className="flex items-center gap-1"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
        
        <Card className="mb-8 overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-6 text-white">
              <h1 className="text-4xl font-bold">{cityData.city}</h1>
              <p className="text-white/80">{cityData.country}</p>
            </div>
          </div>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl">{cityData.city}, {cityData.country}</CardTitle>
              <p className="text-sm text-muted-foreground">Last updated: {formatDateTime(cityData.lastUpdated)}</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <img 
                  src={getWeatherIconUrl(cityData.icon)} 
                  alt={cityData.description} 
                  className="w-32 h-32"
                />
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">{Math.round(cityData.temperature)}°C</div>
                <div className="text-xl mb-1">Feels like: {Math.round(cityData.feelsLike)}°C</div>
                <div className="text-xl capitalize">{cityData.description}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <div className="bg-secondary rounded-full p-1">
                      <Gauge className="h-5 w-5" />
                    </div>
                    Current Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-4">
                    <div className="flex justify-between items-center">
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <Droplets className="h-4 w-4" />
                        Humidity
                      </dt>
                      <dd className="font-medium">{cityData.humidity}%</dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <Wind className="h-4 w-4" />
                        Wind Speed
                      </dt>
                      <dd className="font-medium">{cityData.windSpeed} m/s</dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <Gauge className="h-4 w-4" />
                        Pressure
                      </dt>
                      <dd className="font-medium">1013 hPa</dd>
                    </div>
                    <div className="flex justify-between items-center">
                      <dt className="flex items-center gap-2 text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        Visibility
                      </dt>
                      <dd className="font-medium">10 km</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Daily Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    {[0, 1, 2, 3].map((day) => (
                      <div key={day} className="text-center">
                        <div className="text-sm text-muted-foreground font-medium">{
                          new Date(Date.now() + day * 86400000).toLocaleDateString('en-US', { weekday: 'short' })
                        }</div>
                        <img 
                          src={getWeatherIconUrl(cityData.icon)} 
                          alt="Weather icon" 
                          className="w-10 h-10 mx-auto" 
                        />
                        <div className="text-sm font-medium">{Math.round(cityData.temperature + (Math.random() * 4 - 2))}°</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Hourly Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex overflow-x-auto pb-2 gap-6">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((hour) => (
                    <div key={hour} className="text-center flex-shrink-0">
                      <div className="text-sm text-muted-foreground font-medium">{
                        new Date(Date.now() + hour * 3600000).toLocaleTimeString('en-US', { hour: 'numeric' })
                      }</div>
                      <img 
                        src={getWeatherIconUrl(cityData.icon)} 
                        alt="Weather icon" 
                        className="w-10 h-10 mx-auto" 
                      />
                      <div className="text-sm font-medium">{Math.round(cityData.temperature + (Math.random() * 2 - 1))}°</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Precipitation and Air Quality</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Precipitation</h3>
                  <div className="h-8 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${cityData.humidity}%` }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Air Quality</h3>
                  <div className="h-8 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>Good</span>
                    <span>Moderate</span>
                    <span>Poor</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default WeatherDetailPage;
