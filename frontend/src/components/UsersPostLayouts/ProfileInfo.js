import { useState } from "react";
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
      setError("Failed to update data: " + err);
    }
  };

  return (
    <div>
      <h2 className="title">Profile</h2>
      {user && !editing ? (
        <div>
          <p className="mb-4">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="mb-6">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <button onClick={handleEdit} className="positive-button">
            Edit
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={updatedUser.email || ""}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, email: e.target.value })
              }
              className="input-form"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="input-label"
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
              className="input-form"
            />
          </div>
          <button onClick={handleSave} className="save-button">
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
