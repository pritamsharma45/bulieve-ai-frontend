export default function Comment({ comment }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
          {comment.user.username[0].toUpperCase()}
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium">{comment.user.username}</p>
          <p className="text-xs text-gray-500">{formatDate(comment.created_at)}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm ml-10">
        {comment.content}
      </p>
    </div>
  );
} 