import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4" />
    <h2 className="text-xl font-bold mb-2"><Link to={`/posts/${post.id}`}>{post.title}</Link></h2>
    <p className="text-gray-700">{post.excerpt}</p>
    <div className="text-gray-500 text-sm flex justify-between mt-4">
      <span>{post.author}</span>
      <span>{new Date(post.created_at).toLocaleDateString()}</span>
    </div>
  </div>
);

export default PostCard;
