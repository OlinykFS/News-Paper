import React, { useState, useEffect } from "react";
import api from "../services/api";

const PostList = () => {
  const [posts, setPosts] = useState("");
  const [loading, setLoading] = useState("true");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/api/posts/");
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
