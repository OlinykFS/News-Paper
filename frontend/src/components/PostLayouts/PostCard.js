import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => (
  <Link to={`/posts/${post.id}`} className="block bg-white shadow rounded-lg p-4 mb-4 transition duration-300 hover:shadow-lg">
    <h2 className="text-xl font-bold mb-2">
      <span className="hover:text-blue-500" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
    </h2>
    <div 
      dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
      className="text-gray-700 mb-4 overflow-hidden line-clamp-4"
    />
  </Link>
);

export default PostCard;
