import { deletePost } from '../../services/api';

const UserPostList = ({ posts, refreshPosts }) => {
  if (!Array.isArray(posts)) {
    console.error("Posts is not an array:", posts);
    return null;
  }

  if (posts.length === 0) {
    return <p>No posts available.</p>;
  }

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      await refreshPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <ul className="space-y-4 ">
      {posts.map((post) => (
        <li key={post.id} className="user-custom-post-card">
          <h3 className="title">{post.title}</h3>
          <p className="content">{post.content}</p>
          <button onClick={() => handleDelete(post.id)} className="delete-button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default UserPostList;
