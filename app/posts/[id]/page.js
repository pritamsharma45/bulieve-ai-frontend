import PostDetail from '@/components/PostDetail';

async function getPost(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/posts/${id}/`, {
    next: { revalidate: 300 }
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  
  return res.json();
}

export default async function Post({ params }) {
  const post = await getPost(params.id);
  
  return <PostDetail post={post} />;
} 