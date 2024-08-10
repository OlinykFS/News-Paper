import { useState } from "react";
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
    } catch (error) {
      setError("Failed to create post");
    }
  };

  return (
    <div className="my-8">
      <h2 className="title">Create New Post</h2>
      <form onSubmit={handleCreatePost}>
        <div className="mb-4">
          <label htmlFor="title" className="input-label font-bold">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={newPost.title}
            onChange={handlePostChange}
            className="input-form"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="content" className="input-label font-bold">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={newPost.content}
            onChange={handlePostChange}
            className="input-form "
            required
          />
        </div>
        <button type="submit" className="positive-button">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
