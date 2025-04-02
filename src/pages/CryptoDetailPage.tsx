
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCryptoDetails } from '@/store/cryptoSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const CryptoDetailPage: React.FC = () => {
  const { cryptoId } = useParams<{ cryptoId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  
  const { cryptos, cryptoDetails, detailLoading, error } = useSelector((state: RootState) => state.crypto);
  
  // Check if we have the basic crypto data
  const basicCryptoData = cryptos.find(crypto => crypto.id === cryptoId);
  
  // Check if we have the detailed crypto data
  const detailedData = cryptoId ? cryptoDetails[cryptoId] : undefined;
  
  useEffect(() => {
    if (cryptoId && !detailedData) {
      dispatch(fetchCryptoDetails(cryptoId));
    }
  }, [dispatch, cryptoId, detailedData]);
  
  // Utility functions for formatting
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
  
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  
  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(marketCap);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const getChangeClass = (change: number) => {
    if (change > 0) return 'value-up';
    if (change < 0) return 'value-down';
    return 'value-neutral';
  };
  
  // If we don't have the basic data and we're not loading, show not found
  if (!basicCryptoData && !detailLoading && !error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto py-8 px-4">
          <Link to="/crypto">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cryptocurrencies
            </Button>
          </Link>
          
          <div className="text-center p-12">
            <h1 className="text-3xl font-bold mb-4">Cryptocurrency Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The cryptocurrency you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/crypto">View All Cryptocurrencies</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Use either detailed data or basic data
  const crypto = detailedData || basicCryptoData;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <Link to="/crypto">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cryptocurrencies
          </Button>
        </Link>
        
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {detailLoading && !crypto ? (
          <div className="space-y-4">
            <div className="h-20 loading-pulse rounded-lg"></div>
            <div className="h-64 loading-pulse rounded-lg"></div>
          </div>
        ) : crypto ? (
          <>
            <Card className="mb-8">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-3xl">{crypto.name} ({crypto.symbol.toUpperCase()})</CardTitle>
                    <p className="text-muted-foreground">Last updated: {new Date(crypto.lastUpdated).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{formatPrice(crypto.price)}</div>
                    <div className={`text-lg ${getChangeClass(crypto.priceChangePercent24h)}`}>
                      {formatPercent(crypto.priceChangePercent24h)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm text-muted-foreground">Market Cap</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-xl font-semibold">{formatMarketCap(crypto.marketCap)}</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-sm text-muted-foreground">24h Volume</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="text-xl font-semibold">{formatMarketCap(crypto.volume24h)}</p>
                    </CardContent>
                  </Card>
                  
                  {detailedData && (
                    <>
                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-sm text-muted-foreground">Circulating Supply</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-xl font-semibold">{formatNumber(detailedData.circulatingSupply)}</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-sm text-muted-foreground">Total Supply</CardTitle>
                        </CardHeader>
                        <CardContent className="py-2">
                          <p className="text-xl font-semibold">{formatNumber(detailedData.totalSupply)}</p>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
                
                {detailedData && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Price Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <dl className="space-y-4">
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">24h High</dt>
                            <dd className="font-medium">{formatPrice(detailedData.high24h)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">24h Low</dt>
                            <dd className="font-medium">{formatPrice(detailedData.low24h)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">All-Time High</dt>
                            <dd className="font-medium">{formatPrice(detailedData.allTimeHigh)}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-muted-foreground">All-Time High Date</dt>
                            <dd className="font-medium">{formatDate(detailedData.allTimeHighDate)}</dd>
                          </div>
                        </dl>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">About {crypto.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {detailedData.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Price Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-12">
                  Price chart data would be displayed here in a production app.
                </p>
              </CardContent>
            </Card>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default CryptoDetailPage;
