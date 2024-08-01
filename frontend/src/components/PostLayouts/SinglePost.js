import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/posts/${id}/`);
        setPost(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error: {error.message}</p>;

  return (
    <div className="bg-gray-350 shadow-md rounded-lg p-4">
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <h1 className="text-3xl font-bold mb-4 text-white">{post.title}</h1>
      <p className="text-black mb-4">{post.content}</p>
      <div className="text-gray-400 text-sm flex justify-between">
        <span>{post.author}</span>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default SinglePost;