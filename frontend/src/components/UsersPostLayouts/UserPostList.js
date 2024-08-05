import React from 'react';
import { deletePost } from '../../services/api';

const UserPostList = ({ posts, refreshPosts }) => {
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    return null;
  }

  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      await refreshPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
          <p className="whitespace-normal break-words">{post.content}</p>
          <button
            onClick={() => handleDelete(post.id)}
            className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserPostList;
