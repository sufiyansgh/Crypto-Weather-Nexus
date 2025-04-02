
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchNews } from '@/store/newsSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsCard from '../components/news/NewsCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const NewsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { news, loading, error } = useSelector((state: RootState) => state.news);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  useEffect(() => {
    // Load news data if not already loaded
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we might call an API to search
    // Here we just filter the existing data
  };
  
  const handleRefresh = () => {
    dispatch(fetchNews());
  };
  
  // Filter news based on search query
  const filteredNews = searchQuery
    ? news.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : news;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold">Crypto News</h1>
          <Button onClick={handleRefresh} variant="outline">
            Refresh News
          </Button>
        </div>
        
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading && news.length === 0 ? (
            // Loading state
            Array(6).fill(null).map((_, index) => (
              <div key={index} className="h-48 loading-pulse rounded-lg"></div>
            ))
          ) : filteredNews.length > 0 ? (
            // Display news cards
            filteredNews.map(item => (
              <NewsCard key={item.id} news={item} />
            ))
          ) : (
            // No results
            <div className="col-span-full text-center p-8 bg-card rounded-lg">
              <p className="text-muted-foreground">
                {searchQuery ? 'No news found matching your search.' : 'No news data available.'}
              </p>
              <Button onClick={handleRefresh} className="mt-4">
                Refresh News
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsPage;
