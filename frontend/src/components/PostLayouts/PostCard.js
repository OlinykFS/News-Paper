import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => (
  <Link to={`/posts/${post.id}`} className="custom-post-card">
    <h2 className="title">{post.title.rendered}</h2>
    <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
  </Link>
);

export default PostCard;
