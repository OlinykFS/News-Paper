import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../Context/AuthContext";
import ProfileInfo from "../UsersPostLayouts/ProfileInfo";
import CreatePost from "../UsersPostLayouts/CreatePost";
import UserPostList from "../UsersPostLayouts/UserPostList";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthenticated, logout, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const postsResponse = await api.get("blog/my-posts/");
        if (Array.isArray(postsResponse.data.results)) {
          setPosts(postsResponse.data.results);
        } else {
          console.error("Unexpected data format:", postsResponse.data);
          setPosts([]);
        }
      } catch (err) {
        setError("Failed to load user data");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate, logout]);

  const refreshPosts = async () => {
    try {
      const postsResponse = await api.get("blog/my-posts/");
      if (Array.isArray(postsResponse.data.results)) {
        setPosts(postsResponse.data.results);
      } else {
        console.error("Unexpected data format:", postsResponse.data);
        setPosts([]);
      }
    } catch (err) {
      console.error("Error refreshing posts:", err);
      setPosts([]);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <ProfileInfo user={user} setUser={setUser} setError={setError} />
      <CreatePost refreshPosts={refreshPosts} setError={setError} />
      <UserPostList
        posts={posts}
        refreshPosts={refreshPosts}
        currentUserId={user?.id}
      />
    </div>
  );
};

export default Profile;
