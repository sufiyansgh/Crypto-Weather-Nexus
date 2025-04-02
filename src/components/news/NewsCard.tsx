
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NewsItem } from '@/store/newsSlice';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const [imageError, setImageError] = useState(false);
  
  // Format the published date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Default placeholder image if no image is provided
  const placeholderImage = 'https://via.placeholder.com/640x360?text=No+Image+Available';
  
  return (
    <a href={news.url} target="_blank" rel="noopener noreferrer" className="block transition-transform hover:scale-102">
      <Card className="h-full hover:border-primary/50 transition-colors">
        <div className="w-full h-40 overflow-hidden relative">
          <img 
            src={imageError || !news.imageUrl ? placeholderImage : news.imageUrl} 
            alt={news.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">{news.source}</div>
            <div className="text-xs text-muted-foreground">{formatDate(news.publishedAt)}</div>
          </div>
          <CardTitle className="text-lg">{news.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{news.description}</p>
        </CardContent>
      </Card>
    </a>
  );
};

export default NewsCard;
