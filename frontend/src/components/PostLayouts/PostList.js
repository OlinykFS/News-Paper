import React, { useState, useEffect } from "react";
import api from "../../services/api";
import PostCard from "./PostCard";

const PaginationButtons = ({ onPrev, onNext, prevDisabled, nextDisabled }) => (
  <div className="flex justify-between mt-4">
    <button
      onClick={onPrev}
      disabled={prevDisabled}
      className={`px-4 py-2 bg-gray-300 text-gray-700 rounded-md ${prevDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-400'}`}
    >
      Previous
    </button>
    <button
      onClick={onNext}
      disabled={nextDisabled}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md ${nextDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
    >
      Next
    </button>
  </div>
);

const PostList = ({ className }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchPosts = async (url = "/api/posts/") => {
    setLoading(true);
    try {
      const response = await api.get(url);
      setPosts(response.data.results);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchPosts(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchPosts(prevPage);
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-4">Error: {error.message}</p>;

  return (
    <div className={`container mx-auto ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length ? (
          posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
      <PaginationButtons
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        prevDisabled={!prevPage}
        nextDisabled={!nextPage}
      />
    </div>
  );
};

export default PostList;
