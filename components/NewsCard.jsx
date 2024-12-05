export default function NewsCard({ news }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        {/* <span className="mr-4">Source: {news.source}</span> */}
        <span>{formatDate(news.published_at)}</span>
      </div>
      {news.ai_summary && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h3 className="font-medium mb-1">AI Summary</h3>
          <p className="text-sm">{news.ai_summary}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        {/* <span className={`text-sm px-2 py-1 rounded ${
          news.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
          news.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {news.sentiment}
        </span> */}
        <a
          href={news.original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Read original
        </a>
      </div>
    </article>
  );
}
