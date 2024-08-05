import React from "react";

const PostList = ({ posts }) => {
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    return null;
  }

  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="mb-4">
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostList;