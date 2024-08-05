import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../Context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const { isAuthenticated, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/users/me/");
        setUser(response.data);
      } catch (err) {
        setError("Failed to load user data");
        logout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate, logout]);

  const handleEdit = () => {
    setUpdatedUser(user);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await api.patch("/auth/users/me/", updatedUser);
      setUser(response.data);
      setEditing(false);
    } catch (err) {
      setError("Failed to update data");
    }
  };

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-6">Profile</h2>
      {user && !editing ? (
        <div>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-6">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={updatedUser.email || ""}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              id="username"
              type="text"
              value={updatedUser.username || ""}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, username: e.target.value })
              }
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
