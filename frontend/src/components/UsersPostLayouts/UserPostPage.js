import React,{ useEffect, useState } from "react";
import { fetchPosts } from "../../services/api";
import UserPostList from "./UserPostList"; 
import { AuthContext } from "../../Context/AuthContext"; 

const UserPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = React.useContext(AuthContext); 

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <p className="text-center">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">All User Posts</h1>
      <UserPostList posts={posts} refreshPosts={() => {}} currentUserId={user?.id} />
    </div>
  );
};

export default UserPostsPage;
