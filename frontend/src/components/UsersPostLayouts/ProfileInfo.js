import React, { useState } from "react";
import api from "../../services/api";

const ProfileInfo = ({ user, setUser, setError }) => {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleEdit = () => {
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

  return (
    <div>
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
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
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
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

export default ProfileInfo;
