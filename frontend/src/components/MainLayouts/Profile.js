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
    console.log(
      "Profile useEffect triggered. isAuthenticated:",
      isAuthenticated
    );
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
  if (error)
    return <div className="text-center text-red-500 mt-4">{error}</div>;

  return (
    <div className="border-4 border-solid border-black-700  bg-white mt-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      {user && !editing ? (
        <div>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-4">
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
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={updatedUser.email}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={updatedUser.username}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, username: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
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
