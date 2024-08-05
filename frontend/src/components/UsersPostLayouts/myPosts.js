import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { fetchUserPosts } from "../../services/api";
import UserPostList from "../UsersPostLayouts/UserPostList";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      return; 
    }

    const loadPosts = async () => {
      try {
        const postsResponse = await fetchUserPosts();
        setPosts(postsResponse.results || []);
      } catch (err) {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [isAuthenticated]);

  const refreshPosts = async () => {
    try {
      const postsResponse = await fetchUserPosts();
      setPosts(postsResponse.results || []);
    } catch (err) {
      console.error("Error refreshing posts:", err);
      setPosts([]);
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6">My Posts</h2>
      <UserPostList posts={posts} refreshPosts={refreshPosts} />
    </div>
  );
};

export default MyPosts;
