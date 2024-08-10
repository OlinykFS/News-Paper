import { useState, useEffect, useContext } from "react";
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="single-post">
      <h1 className="title">My Posts</h1>
      <UserPostList posts={posts} refreshPosts={refreshPosts} />
    </div>
  );
};

export default MyPosts;
