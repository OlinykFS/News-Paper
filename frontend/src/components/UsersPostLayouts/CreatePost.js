import React, { useState } from "react";
import api from "../../services/api";

const CreatePost = ({ refreshPosts, setError }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  const handlePostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleCreatePost = async (e) => {
   e.preventDefault();
   try {
     await api.post("/blog/posts/", newPost);
     setNewPost({ title: "", content: "" });
     await refreshPosts();
   } catch (err) {
     setError("Failed to create post");
   }
 };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6">Create New Post</h2>
      <form onSubmit={handleCreatePost}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={newPost.title}
            onChange={handlePostChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={newPost.content}
            onChange={handlePostChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
