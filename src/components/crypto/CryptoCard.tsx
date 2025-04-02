
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CryptoData } from '@/store/cryptoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toggleFavoriteCrypto } from '@/store/userPreferencesSlice';
import { Heart, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const dispatch = useDispatch();
  const { favoriteCryptos } = useSelector((state: RootState) => state.userPreferences);
  const isFavorite = favoriteCryptos.includes(crypto.id);
  
  // Generate mock data for the mini chart
  const getMockChartData = () => {
    // Base the chart direction on the price change percentage
    const isPositive = crypto.priceChangePercent24h > 0;
    const dataPoints = 20;
    const baseValue = crypto.price;
    const variance = baseValue * 0.05; // 5% variance
    
    return Array.from({ length: dataPoints }).map((_, index) => {
      // Create a pattern that generally trends up or down based on priceChangePercent24h
      let direction = isPositive ? 1 : -1;
      // Add some randomness to make it look natural
      const randomFactor = Math.random() * 0.5 + 0.75; // Between 0.75 and 1.25
      
      // Make the pattern have some waves
      if (index % 3 === 0) direction *= -0.5;
      
      const value = baseValue + (direction * variance * randomFactor * (index / dataPoints));
      return { value: Math.max(0, value) };
    });
  };
  
  const chartData = getMockChartData();
  const isPositive = crypto.priceChangePercent24h >= 0;
  
  const getChangeClass = (change: number) => {
    if (change > 0) return 'value-up';
    if (change < 0) return 'value-down';
    return 'value-neutral';
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };
  
  const formatPercent = (percent: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always'
    }).format(percent / 100);
  };
  
  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 2
    }).format(marketCap);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavoriteCrypto(crypto.id));
  };
  
  return (
    <Link to={`/crypto/${crypto.id}`} className="block">
      <Card className="h-full hover:border-primary/50 transition-colors">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </CardTitle>
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
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-3xl font-bold mb-1">
                {formatPrice(crypto.price)}
              </div>
              <div className={`text-lg font-medium flex items-center ${getChangeClass(crypto.priceChangePercent24h)}`}>
                {isPositive ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
                {formatPercent(crypto.priceChangePercent24h)}
              </div>
            </div>
            <div className="w-24 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`gradient-${crypto.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor={isPositive ? "#16a34a" : "#dc2626"} 
                        stopOpacity={0.8}
                      />
                      <stop 
                        offset="95%" 
                        stopColor={isPositive ? "#16a34a" : "#dc2626"} 
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={isPositive ? "#16a34a" : "#dc2626"}
                    fillOpacity={1}
                    fill={`url(#gradient-${crypto.id})`}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <div className="flex justify-between mb-1">
              <span>Market Cap:</span>
              <span>{formatMarketCap(crypto.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span>24h Volume:</span>
              <span>{formatMarketCap(crypto.volume24h)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CryptoCard;
