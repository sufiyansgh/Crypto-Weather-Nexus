
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { fetchNews } from '@/store/newsSlice';
import NewsCard from './NewsCard';
import { Button } from '@/components/ui/button';
import { AppDispatch } from '@/store';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';

const NewsSection: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, error } = useSelector((state: RootState) => state.news);
  
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
  
  // Function to refresh news data
  const handleRefresh = () => {
    dispatch(fetchNews());
  };
  
  return (
    <section className="data-section">
      <div className="flex justify-between items-center mb-4">
        <h2 className="section-title">Latest News</h2>
        <div className="flex space-x-2">
          <Button onClick={handleRefresh} size="sm" variant="outline" className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button asChild size="sm">
            <Link to="/news">View All</Link>
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {loading && news.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-48 loading-pulse rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {news.length > 0 ? (
            news.slice(0, 3).map(item => (
              <NewsCard key={item.id} news={item} />
            ))
          ) : (
            <div className="col-span-full text-center p-8 bg-card rounded-lg">
              <p className="text-muted-foreground">No news data available.</p>
              <Button onClick={handleRefresh} className="mt-4">
                Load News Data
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
