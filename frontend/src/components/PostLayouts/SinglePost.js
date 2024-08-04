import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://dig.watch/wp-json/wp/v2/posts/${id}`);
        if (!response.ok) {
          throw new Error("Error");
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!post) return <p className="text-center">Post not found.</p>;

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <div 
        dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        className="mb-4 prose prose-lg max-w-none"
      />
    </div>
  );
};

export default SinglePost;