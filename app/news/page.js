'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';

function NewsLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
        </div>
      ))}
    </div>
  );
}

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/`, {
          next: { revalidate: 300 }
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await res.json();
        setNews(data.results);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>
      <Suspense fallback={<NewsLoading />}>
        {loading ? (
          <NewsLoading />
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
} 