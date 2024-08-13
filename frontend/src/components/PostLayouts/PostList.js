import { useState, useEffect } from 'react';
import PostCard from './PostCard';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://dig.watch/wp-json/wp/v2/posts`);
        if (!response.ok) {
          throw new Error("Error fetching posts");
        }
        let data = await response.json();
        data = data.filter(post => !post.title.rendered.includes("Telegram Bot Test Test"));
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);

  if (loading) return( <p className='loading'>Loading...</p>);
  if (error) return( <p className='error'>Error: {error}</p>);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))
        ) : (
          <p>No news available.</p>
        )}
      </div>
    </div>
  );
}

export default PostList;
