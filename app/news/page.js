import { Suspense } from 'react';
import NewsCard from '@/components/NewsCard';



async function getNews() {
  const res = await fetch('http://127.0.0.1:8000/api/news/', {
    next: { revalidate: 300 } // Revalidate every 5 minutes
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  
  return res.json();
}

function NewsLoading() {
  return (
    <div className="p-4 space-y-4">
      {[1, 2, 3].map((n) => (
        <div key={n} className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

async function NewsList() {
  const data = await getNews();
  
  if (data.results.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No news articles available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.results.map((news) => (
        <NewsCard key={news.id} news={news} />
      ))}
    </div>
  );
}

export default function News() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>
      <Suspense fallback={<NewsLoading />}>
        <NewsList />
      </Suspense>
    </div>
  );
} 