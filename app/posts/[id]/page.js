import PostDetail from '@/components/PostDetail';

async function getPost(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}/`, {
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