import React, { useState } from "react";
import { deletePost, updatePost } from "../../services/api";
import { format } from "date-fns";

const UserPostList = ({ posts, refreshPosts, currentUserId }) => {
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");

  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    return null;
  }

  if (posts.length === 0) {
    return <p className="text-gray-500">No posts available.</p>;
  }

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      await refreshPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost(editingPostId, { title: editTitle, content: editContent });
      setEditingPostId(null);
      await refreshPosts();
    } catch (error) {
      setError("Error updating post.");
      console.error("Error updating post:", error);
    }
  };

  return (
    <ul className="space-y-6">
      {posts.map((post) => (
        <li key={post.id} className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="text-gray-700 mb-4">{post.content}</p>
          <p className="text-gray-500 text-sm mb-4">Author: {post.author.email}</p>
          <p className="text-gray-500 text-sm mb-4">
            Created at: {format(new Date(post.created_at), 'PPPpp')}
          </p>
          <div className="flex justify-end space-x-4">
            {post.author.id === currentUserId && (
              <>
                {editingPostId === post.id ? (
                  <div className="w-full">
                    <form onSubmit={handleUpdate} className="space-y-4">
                      <label className="block mb-2">
                        Title:
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full border rounded p-2 mt-1"
                          required
                        />
                      </label>
                      <label className="block mb-2">
                        Content:
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full border rounded p-2 mt-1"
                          required
                        />
                      </label>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingPostId(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      {error && <p className="text-red-500">{error}</p>}
                    </form>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(post)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserPostList;
