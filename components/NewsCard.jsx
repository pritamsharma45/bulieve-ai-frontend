import ExpandableText from "./ExpandableText";

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
        <span>{formatDate(news.published_at)}</span>
      </div>
      {news.ai_summary && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md mb-3">
          <h3 className="font-medium mb-1">AI Summary</h3>
          <ExpandableText text={news.ai_summary} maxLines={3} />
        </div>
      )}
      <div className="flex items-center justify-between">
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
